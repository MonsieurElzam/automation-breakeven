import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, mkdtempSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const sample = (n) => readFileSync(new URL(`../samples/${n}`, import.meta.url), 'utf8')
const mod = (n) => import(`../src/${n}.mjs`)
const run = (n, args = []) => spawnSync(process.execPath, [fileURLToPath(new URL(`../src/${n}.mjs`, import.meta.url)), ...args], { encoding: 'utf8' })
const samplePath = (n) => fileURLToPath(new URL(`../samples/${n}`, import.meta.url))

test('28 seuil de rentabilité : unités, chiffre d\'affaires, objectif de bénéfice, cas impossible', async () => {
  const { breakeven } = await mod('breakeven')
  const r = breakeven({ fixed: 800000, price: 25000, variable: 9000, targetProfit: 500000 })
  assert.deepEqual([r.unitMargin, r.units, r.revenue, r.targetUnits], [16000, 50, 1250000, 82]); assert.equal(r.marginRate, 0.64)
  assert.deepEqual(r.scenarios.find((s) => s.units === 50), { units: 50, revenue: 1250000, profit: 0 }); assert.ok(r.scenarios[0].profit < 0)
  assert.throws(() => breakeven({ fixed: 100, price: 10, variable: 10 }), /jamais rentable/); assert.throws(() => breakeven({ fixed: -1, price: 10 }), /positif/); assert.throws(() => breakeven({ fixed: NaN, price: 10 }), /fixed/)
})
