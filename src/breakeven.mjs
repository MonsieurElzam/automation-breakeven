#!/usr/bin/env node
/* Seuil de rentabilité : combien vendre pour couvrir ses coûts fixes, et ce que rapporte chaque palier de ventes. */
import { money, pct, round } from '../lib/format.mjs'
import { isMain, parseArgs, usage, fail } from '../lib/cli.mjs'

export function breakeven({ fixed, price, variable = 0, targetProfit = 0 }) {
  for (const [k, v] of Object.entries({ fixed, price, variable, targetProfit })) if (!Number.isFinite(v) || v < 0) throw new Error(`« ${k} » doit être un nombre positif.`)
  const unitMargin = price - variable
  if (unitMargin <= 0) throw new Error(`le prix (${price}) ne couvre pas le coût variable (${variable}) : aucune vente ne sera jamais rentable.`)
  const units = Math.ceil(fixed / unitMargin)
  const targetUnits = Math.ceil((fixed + targetProfit) / unitMargin)
  const scenarios = [0.5, 0.75, 1, 1.25, 1.5, 2].map((k) => {
    const u = Math.round(units * k)
    return { units: u, revenue: round(u * price), profit: round(u * unitMargin - fixed) }
  })
  return { unitMargin: round(unitMargin), marginRate: unitMargin / price, units, revenue: round(units * price), targetUnits, targetRevenue: round(targetUnits * price), scenarios }
}

if (isMain(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2), ['help'])
  usage(`
Usage : node src/breakeven.mjs --fixed 800000 --price 25000 --variable 9000 [--target-profit 500000]
--fixed : coûts fixes sur la période (loyer, salaires…) · --price : prix de vente unitaire · --variable : coût variable par vente.
Toutes les valeurs dans la même devise et la même période (mois, par exemple).`, { ...args, _: args.fixed && args.price ? ['x'] : [] }, 1)
  let r
  try { r = breakeven({ fixed: Number(args.fixed), price: Number(args.price), variable: Number(args.variable ?? 0), targetProfit: Number(args['target-profit'] ?? 0) }) } catch (e) { fail(e.message) }
  console.log(`Marge unitaire : ${money(r.unitMargin, 2)} (${pct(r.marginRate)} du prix)`)
  console.log(`Seuil de rentabilité : ${r.units} ventes, soit ${money(r.revenue)} de chiffre d'affaires`)
  if (args['target-profit']) console.log(`Pour ${money(Number(args['target-profit']))} de bénéfice : ${r.targetUnits} ventes (${money(r.targetRevenue)})`)
  console.log('\nVentes   Chiffre d\'affaires   Résultat')
  r.scenarios.forEach((s) => console.log(`${String(s.units).padStart(6)}   ${money(s.revenue).padStart(18)}   ${money(s.profit).padStart(10)}${s.profit < 0 ? '  (perte)' : ''}`))
}
