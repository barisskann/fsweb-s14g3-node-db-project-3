const db = require("../../data/db-config");

async function ıdCheck(id) {
  return db("schemes");
}
function find() {
  // Egzersiz A
  /*
    1A- Aşağıdaki SQL sorgusunu SQLite Studio'da "data/schemes.db3" ile karşılaştırarak inceleyin.
    LEFT joini Inner joine çevirirsek ne olur?

      SELECT
          sc.*,
          count(st.step_id) as number_of_steps
      FROM schemes as sc
      LEFT JOIN steps as st
          ON sc.scheme_id = st.scheme_id
      GROUP BY sc.scheme_id
      ORDER BY sc.scheme_id ASC;

    2A- Sorguyu kavradığınızda devam edin ve onu Knex'te oluşturun.
    Bu işlevden elde edilen veri kümesini döndürün.
  */
  return db

    .select("sc.*")
    .from("schemes as sc")
    .leftJoin("steps", "sc.scheme_id", "steps.scheme_id")
    .count("steps.step_number as number_of_steps")
    .groupBy("sc.scheme_id")
    .orderBy("sc.scheme_id");
}

async function findById(scheme_id) {
  let obj = { steps: [] };
  let steps = [];

  const data = await db
    .select("sc.*", "st.*")
    .from("schemes as sc")
    .leftJoin("steps as st", "sc.scheme_id", "st.scheme_id")
    .where("sc.scheme_id", scheme_id)
    .orderBy("st.step_number");
  // const aray = data.map((i) => {
  //   obj.scheme_id = i.scheme_id;
  //   obj.scheme_name = i.scheme_name;
  //   let veri = {
  //     step_id: i.step_id,
  //     step_number: i.step_number,
  //     instructions: i.instructions,
  //   };
  //   steps.push(veri);
  // });
  // obj.steps = steps;
  const aray = data.forEach((i) => {
    obj = {
      scheme_id: i.scheme_id,
      scheme_name: i.scheme_name,
      steps: i.step_id
        ? [
            ...obj.steps,
            {
              step_id: i.step_id,
              step_number: i.step_number,
              instructions: i.instructions,
            },
          ]
        : [],
    };
  });
  return obj;

  // Egzersiz B
  /*
    1B- Aşağıdaki SQL sorgusunu SQLite Studio'da "data/schemes.db3" ile karşılaştırarak inceleyin:

      SELECT
          sc.scheme_name,
          st.*
      FROM schemes as sc
      LEFT JOIN steps as st
          ON sc.scheme_id = st.scheme_id
      WHERE sc.scheme_id = 1
      ORDER BY st.step_number ASC;
    2B- Sorguyu kavradığınızda devam edin ve onu Knex'te oluşturun
    parametrik yapma: `1` hazır değeri yerine `scheme_id` kullanmalısınız.

    3B- Postman'da test edin ve ortaya çıkan verilerin bir şema gibi görünmediğini görün,
    ancak daha çok her biri şema bilgisi içeren bir step dizisi gibidir:

      [
        {
          "scheme_id": 1,
          "scheme_name": "World Domination",
          "step_id": 2,
          "step_number": 1,
          "instructions": "solve prime number theory"
        },
        {
          "scheme_id": 1,
          "scheme_name": "World Domination",
          "step_id": 1,
          "step_number": 2,
          "instructions": "crack cyber security"
        },
        // etc
      ]

    4B- Elde edilen diziyi ve vanilya JavaScript'i kullanarak, ile bir nesne oluşturun.
   Belirli bir "scheme_id" için adımların mevcut olduğu durum için aşağıdaki yapı:

      {
        "scheme_id": 1,
        "scheme_name": "World Domination",
        "steps": [
          {
            "step_id": 2,
            "step_number": 1,
            "instructions": "solve prime number theory"
          },
          {
            "step_id": 1,
            "step_number": 2,
            "instructions": "crack cyber security"
          },
          // etc
        ]
      }

    5B- Bir "scheme_id" için adım yoksa, sonuç şöyle görünmelidir:

      {
        "scheme_id": 7,
        "scheme_name": "Have Fun!",
        "steps": []
      }
  */
}

async function findSteps(scheme_id) {
  const a = await db
    .select(
      "steps.step_id",
      "steps.instructions",
      "steps.step_number",
      "schemes.scheme_name"
    )
    .from("schemes")
    .leftJoin("steps", "steps.scheme_id", "schemes.scheme_id")
    .where("schemes.scheme_id", scheme_id)

    .orderBy("step_number");
  if (!a || a.length == 0) return [];

  return a;
  // Egzersiz C
  /*
    1C- Knex'te aşağıdaki verileri döndüren bir sorgu oluşturun.
    Adımlar, adım_numarası'na göre sıralanmalıdır ve dizi
    Şema için herhangi bir adım yoksa boş olmalıdır:

      [
        {
          "step_id": 5,
          "step_number": 1,
          "instructions": "collect all the sheep in Scotland",
          "scheme_name": "Get Rich Quick"
        },
        {
          "step_id": 4,
          "step_number": 2,
          "instructions": "profit",
          "scheme_name": "Get Rich Quick"
        }
      ]
  */
}

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then((r) => findById(r[0]));

  // Egzersiz D
  /*
    1D- Bu işlev yeni bir şema oluşturur ve _yeni oluşturulan şemaya çözümlenir.
  */
}

async function addStep(scheme_id, step) {
  console.log(step);
  return db("steps")
    .insert({
      instructions: step.instructions,
      step_number: step.step_number,
      scheme_id,
    })
    .then((r) => console.log(r));
  // EXERCISE E
  /*
    1E- Bu işlev, verilen 'scheme_id' ile şemaya bir adım ekler.
    ve verilen "scheme_id"ye ait _tüm adımları_ çözer,
    yeni oluşturulan dahil.
  */
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  ıdCheck,
};
