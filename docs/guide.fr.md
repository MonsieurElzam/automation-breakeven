## À quoi ça sert

Combien faut-il vendre pour ne pas perdre d'argent ? Le seuil de rentabilité répond : c'est le nombre de ventes pour lequel la marge couvre exactement vos coûts fixes. Ce script le calcule, ainsi que le volume pour atteindre un **bénéfice cible**, et montre l'effet de ±50 % de ventes.

## Avant de commencer

Trois chiffres, sur la même période (par exemple le mois) et dans la même devise :
- vos **coûts fixes** (loyer, salaires, abonnements) ;
- votre **prix** de vente unitaire ;
- votre **coût variable** par vente (matière, commission, livraison).

## Pas à pas

1. Calculez :
   ```bash
   node src/breakeven.mjs --fixed 800000 --price 25000 --variable 9000 --target-profit 500000
   ```
2. Lisez la marge unitaire (prix − coût variable) et le seuil en nombre de ventes et en chiffre d'affaires.
3. Modifiez le prix ou les coûts et comparez : une hausse de prix de 5 % pèse souvent plus qu'une baisse de coûts de 5 %.

## Lire le résultat

Le tableau des paliers montre le résultat à 50 %, 75 %, 100 %, 125 %, 150 % et 200 % du seuil : en dessous de 100 %, vous perdez ; au-dessus, vous gagnez la marge unitaire par vente supplémentaire.

## L'automatiser

À refaire à chaque changement de prix ou de structure de coûts ; rien à planifier.

## Pièges à éviter

- Si le prix ne couvre pas le coût variable, le script le dit : aucune quantité ne rendra l'activité rentable.
- Le modèle suppose des coûts fixes constants : au-delà d'un certain volume, il faudra embaucher ou louer plus grand.
