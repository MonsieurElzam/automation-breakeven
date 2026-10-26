## What it's for

How much must you sell to avoid losing money? The break-even point answers: it is the number of sales at which the margin exactly covers your fixed costs. This script computes it, plus the volume needed for a **target profit**, and shows the effect of ±50 % sales.

## Before you start

Three figures, over the same period (for example a month) and in the same currency:
- your **fixed costs** (rent, salaries, subscriptions);
- your unit selling **price**;
- your **variable cost** per sale (materials, commission, delivery).

## Step by step

1. Compute:
   ```bash
   node src/breakeven.mjs --fixed 800000 --price 25000 --variable 9000 --target-profit 500000
   ```
2. Read the unit margin (price − variable cost) and the break-even in number of sales and in revenue.
3. Change the price or the costs and compare: a 5 % price rise often outweighs a 5 % cost cut.

## Reading the output

The scenario table shows the result at 50 %, 75 %, 100 %, 125 %, 150 % and 200 % of break-even: below 100 % you lose; above it you earn the unit margin on each extra sale.

## Automating it

Redo it whenever prices or cost structure change; nothing to schedule.

## Pitfalls

- If the price does not cover the variable cost, the script says so: no quantity will make the business profitable.
- The model assumes constant fixed costs: beyond some volume you will need to hire or move to a bigger space.
