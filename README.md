# Baby's Mentor Academy — Points & Proportional Prize Distribution

Upload **index.html** to the GitHub repository's root on `main`, replacing the existing file. All other files in this package are the existing server and assets, included for completeness.

## Scoring
- Once both math quiz captains are chosen, Team A and Team B each start at 10 points.
- Rock–Paper–Scissors: winning player earns 5 points for the chosen team; losing player earns 2 points for the opposite team. Host can adjust for future matchups; existing rounds retain their recorded awards.
- Mystery individual game winner: 10 points. Bonus team game winner: 20 points. Captain double-points power doubles one eligible individual win. Undo restores a used power-up.
- Points are **not** dollars. The prize pool comes from paid guest fees plus the host contribution.
- Final bid per team must be a whole number between 0 and its earned score. Correct prediction adds the bid as bonus points; wrong prediction adds 0 and does not deduct anything.
- Final prize share: pool × team final points ÷ both teams' combined final points. Amounts rounded to cents, with the remainder assigned to Team B so the total equals the pool.
- Per-player distribution divides each team's payout evenly among members and allocates leftover cents in token order. Host must handle empty teams manually.

## Deployment and data
- Persistent Railway event state is preserved by this update.
- Previous game awards recorded under the earlier money-derived system are not silently rewritten. For an accurate fresh event, reset demo/test data using the existing host controls **after backing it up**. Do not reset real event data inadvertently.
- Deploy to Railway through the connected GitHub repository. Test with host and audience screens separately.
- Keep the host PIN secret and rotate it before the event.

## Verification
- Embedded JavaScript checked with `node --check`.
- Scoring test verifies math captain points, RPS awards, mystery points, correct and incorrect bid bonuses, and prize pool conservation.
