const router = require("express").Router();
const ShadowWar = require('../models/ShadowWar');

router.get('/next', async (req, res) => {
  try {
    const today = new Date();
    const now = new Date();

    const getNextDayOfWeek = (date, dayOfWeek) => {
      const resultDate = new Date(date.getTime());
      const daysUntil = (dayOfWeek - date.getDay() + 7) % 7;
      resultDate.setDate(date.getDate() + daysUntil);
      return resultDate;
    };

    let nextThursday = getNextDayOfWeek(today, 4); // 4 = Thursday
    nextThursday.setHours(19, 30, 0, 0);

    let nextSaturday = getNextDayOfWeek(today, 6); // 6 = Saturday
    nextSaturday.setHours(19, 30, 0, 0);

    if (nextThursday < now) {
      nextThursday.setDate(nextThursday.getDate() + 7);
    }

    if (nextSaturday < now) {
      nextSaturday.setDate(nextSaturday.getDate() + 7);
    }

    const nextBattleDate = nextThursday < nextSaturday ? nextThursday : nextSaturday;

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
          exalted: [{ grupo1: [], group2: [], result: "pending" }, { grupo1: [], group2: [], result: "pending" }, { grupo1: [], group2: [], result: "pending" }],
          eminent: [{ grupo1: [], group2: [], result: "pending" }, { grupo1: [], group2: [], result: "pending" }, { grupo1: [], group2: [], result: "pending" }],
          famed: [{ grupo1: [], group2: [], result: "pending" }, { grupo1: [], group2: [], result: "pending" }, { grupo1: [], group2: [], result: "pending" }],
          proud: [{ grupo1: [], group2: [], result: "pending" }, { grupo1: [], group2: [], result: "pending" }, { grupo1: [], group2: [], result: "pending" }],
        },
        result: "pending"
      });
      await newShadowWar.save();
      nextBattle = newShadowWar;
    }

    res.json(nextBattle);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la próxima Shadow War.', error });
  }
});

module.exports = router;
