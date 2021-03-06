const DrawCard = require('../../drawcard.js');

class SweetCersei extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            condition: () => this.game.currentPhase === 'challenge',
            match: this,
            effect: ability.effects.canSpendGold(spendParams => spendParams.activePlayer === this.controller)
        });
        this.reaction({
            when: {
                afterChallenge: event => event.challenge.winner === this.controller && event.challenge.challengeType === 'intrigue'
            },
            handler: () => {
                this.modifyToken('gold', 1);
                this.game.addMessage('{0} uses {1} to place 1 gold from the treasury on {1}', this.controller, this);
            }
        });
    }
}

SweetCersei.code = '08070';

module.exports = SweetCersei;
