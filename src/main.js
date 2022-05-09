const datefns = require("date-fns");

// Este código é escalável, para adicionar um novo hotel a ser calculado na lista basta criar uma nova classe e adiciona-la ao array de hotels.
// Além disso, o mesmo aceita mais que três datas. Na documentação não existe nenhum tipo de limitação para uso de bibliotecas, então decidi utilizar o
// date-fns para descobrir se a data passada é ou não um fim de semana.

function getCheapestHotel(input) {
  //DO NOT change the function's name.
  const type = input.substr(0, input.indexOf(":")); // break apart type of client
  const dates = input.substr(input.indexOf(":") + 2, 999).split(","); // break apart date
  const hotels = [Lakewood, Bridgewood, Ridgewood]; // array of hotels class
  let finalValues = [];

  // this function back to caller the value of one class by type and date
  const calcValue = (classe, type, date) => {
    if (datefns.isWeekend(date)) {
      if (type === "Regular") {
        return classe.regularWeekendDayValue;
      } else {
        return classe.rewardWeekendDayValue;
      }
    } else {
      if (type === "Regular") {
        return classe.regularWeekDayValue;
      } else {
        return classe.rewardWeekDayValue;
      }
    }
  };

  // this part of code can back the final value of array hotels
  try {
    dates.map((date) => {
      hotels.map((hotel) => {
        const thisValue = calcValue(hotel, type, new Date(date));
        if (!thisValue) {
          throw new Error(`Não existe uma classe para o ${hotel}.`);
        }

        finalValues[hotel.name + " - " + hotel.classification] =
          thisValue +
          (finalValues[hotel.name + " - " + hotel.classification] || 0);
      });
    });
  } catch (err) {
    console.log(err);
  }

  let bestValue = {};
  let haveEquals = undefined;

  //Comparação de valores para descobrir o que mais irá valer a pena
  Object.keys(finalValues).map((key) => {
    //Verifica se existe algum valor igual
    if (
      Object.keys(finalValues).find(
        (value) => finalValues[value] === finalValues[key] && value !== key
      )
    ) {
      haveEquals = true;
      const classification = key.substr(key.indexOf("-") + 2, 2);
      bestValue =
        bestValue[Object.keys(bestValue)[1]] >= classification
          ? bestValue
          : { [key]: finalValues[key], class: classification };

      return;
    }

    //Verifica o maior valor caso não exista nenhum valor igual
    if (!haveEquals) {
      bestValue =
        bestValue[Object.keys(bestValue)[0]] <= finalValues[key]
          ? bestValue
          : { [key]: finalValues[key] };
    }
  });

  return Object.keys(bestValue)[0]
    .substr(0, Object.keys(bestValue)[0].indexOf("-"))
    .replace(" ", "");
}

class Lakewood {
  static regularWeekDayValue = 110;
  static regularWeekendDayValue = 90;
  static rewardWeekDayValue = 80;
  static rewardWeekendDayValue = 80;
  static classification = 3;
}

class Bridgewood {
  static regularWeekDayValue = 160;
  static regularWeekendDayValue = 60;
  static rewardWeekDayValue = 110;
  static rewardWeekendDayValue = 50;
  static classification = 4;
}

class Ridgewood {
  static regularWeekDayValue = 220;
  static regularWeekendDayValue = 150;
  static rewardWeekDayValue = 100;
  static rewardWeekendDayValue = 40;
  static classification = 5;
}

getCheapestHotel("Reward: 26Mar2009(thur), 27Mar2009(fri), 28Mar2009(sat)");
exports.getCheapestHotel = getCheapestHotel;
