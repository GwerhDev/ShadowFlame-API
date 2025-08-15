const ShadowWar = require('../models/ShadowWar');

const getNextBattle = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dayOfWeek = today.getDay();

    let nextBattleDate = new Date(today);

    if (dayOfWeek >= 0 && dayOfWeek <= 4) { // Sunday to Thursday
      const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
      nextBattleDate.setDate(today.getDate() + daysUntilThursday);
    } else { // Friday and Saturday
      const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
      nextBattleDate.setDate(today.getDate() + daysUntilSaturday);
    }

    let nextBattle = await ShadowWar.findOne({
      date: {
        $gte: nextBattleDate,
        $lt: new Date(nextBattleDate.getTime() + 24 * 60 * 60 * 1000),
      },
    })
      .populate('confirmed')
      .populate('enemyClan')
      .populate('battle.exalted.group1.member')
      .populate('battle.exalted.group2.member')
      .populate('battle.eminent.group1.member')
      .populate('battle.eminent.group2.member')
      .populate('battle.famed.group1.member')
      .populate('battle.famed.group2.member')
      .populate('battle.proud.group1.member')
      .populate('battle.proud.group2.member');

    if (!nextBattle) {
      const newShadowWar = new ShadowWar({
        date: nextBattleDate,
        enemyClan: null,
        confirmed: [],
        battle: {
          exalted: [],
          eminent: [],
          famed: [],
          proud: []
        }
      });
      await newShadowWar.save();
      nextBattle = newShadowWar;
    }

    res.json(nextBattle);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la próxima Shadow War.', error });
  }
};

module.exports = {
  getNextBattle,
};
