const groups = [
  {
    name: "Grupo A",

    teams: [
      { flag: "https://flagcdn.com/w40/mx.png", name: "México" },
      { flag: "https://flagcdn.com/w40/za.png", name: "África do Sul" },
      { flag: "https://flagcdn.com/w40/kr.png", name: "Coreia do Sul" },
      { flag: "https://flagcdn.com/w40/cz.png", name: "Tchéquia" },
    ],

    matches: [
      {
        date: "11/06",
        time: "16:00",
        location: "Cidade do México",
        home: "México",
        away: "África do Sul",
      },

      {
        date: "11/06",
        time: "23:00",
        location: "Guadalajara",
        home: "Coreia do Sul",
        away: "Tchéquia",
      },

      {
        date: "18/06",
        time: "13:00",
        location: "Atlanta",
        home: "Tchéquia",
        away: "África do Sul",
      },

      {
        date: "18/06",
        time: "22:00",
        location: "Guadalajara",
        home: "México",
        away: "Coreia do Sul",
      },

      {
        date: "24/06",
        time: "22:00",
        location: "Cidade do México",
        home: "Tchéquia",
        away: "México",
      },

      {
        date: "24/06",
        time: "22:00",
        location: "Monterrey",
        home: "África do Sul",
        away: "Coreia do Sul",
      },
    ],
  },

  {
    name: "Grupo B",

    teams: [
      { flag: "https://flagcdn.com/w40/ca.png", name: "Canadá" },
      { flag: "https://flagcdn.com/w40/ba.png", name: "Bósnia e Herz." },
      { flag: "https://flagcdn.com/w40/qa.png", name: "Catar" },
      { flag: "https://flagcdn.com/w40/ch.png", name: "Suíça" },
    ],

    matches: [
      {
        date: "12/06",
        time: "16:00",
        location: "Toronto",
        home: "Canadá",
        away: "Bósnia e Herz.",
      },

      {
        date: "13/06",
        time: "16:00",
        location: "Santa Clara",
        home: "Catar",
        away: "Suíça",
      },

      {
        date: "18/06",
        time: "16:00",
        location: "Los Angeles",
        home: "Suíça",
        away: "Bósnia e Herz.",
      },

      {
        date: "18/06",
        time: "19:00",
        location: "Vancouver",
        home: "Canadá",
        away: "Catar",
      },

      {
        date: "24/06",
        time: "16:00",
        location: "Vancouver",
        home: "Suíça",
        away: "Canadá",
      },

      {
        date: "24/06",
        time: "16:00",
        location: "Seattle",
        home: "Bósnia e Herz.",
        away: "Catar",
      },
    ],
  },

  {
    name: "Grupo C",

    teams: [
      { flag: "https://flagcdn.com/w40/br.png", name: "Brasil" },
      { flag: "https://flagcdn.com/w40/ma.png", name: "Marrocos" },
      { flag: "https://flagcdn.com/w40/ht.png", name: "Haiti" },
      { flag: "https://flagcdn.com/w40/gb.png", name: "Escócia" },
    ],

    matches: [
      {
        date: "13/06",
        time: "19:00",
        location: "Nova York",
        home: "Brasil",
        away: "Marrocos",
      },

      {
        date: "13/06",
        time: "22:00",
        location: "Boston",
        home: "Haiti",
        away: "Escócia",
      },

      {
        date: "19/06",
        time: "19:00",
        location: "Boston",
        home: "Escócia",
        away: "Marrocos",
      },

      {
        date: "19/06",
        time: "21:30",
        location: "Filadélfia",
        home: "Brasil",
        away: "Haiti",
      },

      {
        date: "24/06",
        time: "19:00",
        location: "Miami",
        home: "Escócia",
        away: "Brasil",
      },

      {
        date: "24/06",
        time: "19:00",
        location: "Atlanta",
        home: "Marrocos",
        away: "Haiti",
      },
    ],
  },

  {
    name: "Grupo D",

    teams: [
      { flag: "https://flagcdn.com/w40/us.png", name: "Estados Unidos" },
      { flag: "https://flagcdn.com/w40/py.png", name: "Paraguai" },
      { flag: "https://flagcdn.com/w40/au.png", name: "Austrália" },
      { flag: "https://flagcdn.com/w40/tr.png", name: "Turquia" },
    ],

    matches: [
      {
        date: "12/06",
        time: "22:00",
        location: "Los Angeles",
        home: "Estados Unidos",
        away: "Paraguai",
      },

      {
        date: "14/06",
        time: "01:00",
        location: "Vancouver",
        home: "Austrália",
        away: "Turquia",
      },

      {
        date: "19/06",
        time: "00:00",
        location: "Santa Clara",
        home: "Turquia",
        away: "Paraguai",
      },

      {
        date: "19/06",
        time: "16:00",
        location: "Seattle",
        home: "Estados Unidos",
        away: "Austrália",
      },

      {
        date: "25/06",
        time: "23:00",
        location: "Los Angeles",
        home: "Turquia",
        away: "Estados Unidos",
      },

      {
        date: "25/06",
        time: "23:00",
        location: "Santa Clara",
        home: "Paraguai",
        away: "Austrália",
      },
    ],
  },
  ,
  {
    name: "Grupo E",

    teams: [
      { flag: "https://flagcdn.com/w40/de.png", name: "Alemanha" },
      { flag: "https://flagcdn.com/w40/cw.png", name: "Curaçao" },
      { flag: "https://flagcdn.com/w40/ci.png", name: "Costa do Marfim" },
      { flag: "https://flagcdn.com/w40/ec.png", name: "Equador" },
    ],

    matches: [
      {
        date: "14/06",
        time: "14:00",
        location: "Houston",
        home: "Alemanha",
        away: "Curaçao",
      },

      {
        date: "14/06",
        time: "20:00",
        location: "Filadélfia",
        home: "Costa do Marfim",
        away: "Equador",
      },

      {
        date: "20/06",
        time: "17:00",
        location: "Toronto",
        home: "Alemanha",
        away: "Costa do Marfim",
      },

      {
        date: "20/06",
        time: "21:00",
        location: "Kansas City",
        home: "Equador",
        away: "Curaçao",
      },

      {
        date: "25/06",
        time: "17:00",
        location: "Nova York",
        home: "Equador",
        away: "Alemanha",
      },

      {
        date: "25/06",
        time: "17:00",
        location: "Filadélfia",
        home: "Curaçao",
        away: "Costa do Marfim",
      },
    ],
  },

  {
    name: "Grupo F",

    teams: [
      { flag: "https://flagcdn.com/w40/nl.png", name: "Holanda" },
      { flag: "https://flagcdn.com/w40/jp.png", name: "Japão" },
      { flag: "https://flagcdn.com/w40/se.png", name: "Suécia" },
      { flag: "https://flagcdn.com/w40/tn.png", name: "Tunísia" },
    ],

    matches: [
      {
        date: "14/06",
        time: "17:00",
        location: "Dallas",
        home: "Holanda",
        away: "Japão",
      },

      {
        date: "14/06",
        time: "23:00",
        location: "Monterrey",
        home: "Suécia",
        away: "Tunísia",
      },

      {
        date: "20/06",
        time: "23:00",
        location: "Monterrey",
        home: "Tunísia",
        away: "Japão",
      },

      {
        date: "20/06",
        time: "14:00",
        location: "Houston",
        home: "Holanda",
        away: "Suécia",
      },

      {
        date: "25/06",
        time: "20:00",
        location: "Dallas",
        home: "Japão",
        away: "Suécia",
      },

      {
        date: "25/06",
        time: "20:00",
        location: "Kansas City",
        home: "Tunísia",
        away: "Holanda",
      },
    ],
  },

  {
    name: "Grupo G",

    teams: [
      { flag: "https://flagcdn.com/w40/be.png", name: "Bélgica" },
      { flag: "https://flagcdn.com/w40/eg.png", name: "Egito" },
      { flag: "https://flagcdn.com/w40/ir.png", name: "Irã" },
      { flag: "https://flagcdn.com/w40/nz.png", name: "Nova Zelândia" },
    ],

    matches: [
      {
        date: "15/06",
        time: "16:00",
        location: "Seattle",
        home: "Bélgica",
        away: "Egito",
      },

      {
        date: "15/06",
        time: "22:00",
        location: "Los Angeles",
        home: "Irã",
        away: "Nova Zelândia",
      },

      {
        date: "21/06",
        time: "16:00",
        location: "Los Angeles",
        home: "Bélgica",
        away: "Irã",
      },

      {
        date: "21/06",
        time: "22:00",
        location: "Vancouver",
        home: "Nova Zelândia",
        away: "Egito",
      },

      {
        date: "26/06",
        time: "00:00",
        location: "Seattle",
        home: "Egito",
        away: "Irã",
      },

      {
        date: "26/06",
        time: "00:00",
        location: "Vancouver",
        home: "Nova Zelândia",
        away: "Bélgica",
      },
    ],
  },

  {
    name: "Grupo H",

    teams: [
      { flag: "https://flagcdn.com/w40/es.png", name: "Espanha" },
      { flag: "https://flagcdn.com/w40/cv.png", name: "Cabo Verde" },
      { flag: "https://flagcdn.com/w40/sa.png", name: "Arábia Saudita" },
      { flag: "https://flagcdn.com/w40/uy.png", name: "Uruguai" },
    ],

    matches: [
      {
        date: "15/06",
        time: "13:00",
        location: "Atlanta",
        home: "Espanha",
        away: "Cabo Verde",
      },

      {
        date: "15/06",
        time: "19:00",
        location: "Miami",
        home: "Arábia Saudita",
        away: "Uruguai",
      },

      {
        date: "21/06",
        time: "13:00",
        location: "Atlanta",
        home: "Espanha",
        away: "Arábia Saudita",
      },

      {
        date: "21/06",
        time: "19:00",
        location: "Miami",
        home: "Uruguai",
        away: "Cabo Verde",
      },

      {
        date: "26/06",
        time: "21:00",
        location: "Houston",
        home: "Cabo Verde",
        away: "Arábia Saudita",
      },

      {
        date: "26/06",
        time: "21:00",
        location: "Guadalajara",
        home: "Uruguai",
        away: "Espanha",
      },
    ],
  },

  {
    name: "Grupo I",

    teams: [
      { flag: "https://flagcdn.com/w40/fr.png", name: "França" },
      { flag: "https://flagcdn.com/w40/sn.png", name: "Senegal" },
      { flag: "https://flagcdn.com/w40/iq.png", name: "Iraque" },
      { flag: "https://flagcdn.com/w40/no.png", name: "Noruega" },
    ],

    matches: [
      {
        date: "16/06",
        time: "16:00",
        location: "Nova York",
        home: "França",
        away: "Senegal",
      },

      {
        date: "16/06",
        time: "19:00",
        location: "Boston",
        home: "Iraque",
        away: "Noruega",
      },

      {
        date: "22/06",
        time: "18:00",
        location: "Filadélfia",
        home: "França",
        away: "Iraque",
      },

      {
        date: "22/06",
        time: "21:00",
        location: "Nova York",
        home: "Noruega",
        away: "Senegal",
      },

      {
        date: "26/06",
        time: "16:00",
        location: "Boston",
        home: "Noruega",
        away: "França",
      },

      {
        date: "26/06",
        time: "16:00",
        location: "Toronto",
        home: "Senegal",
        away: "Iraque",
      },
    ],
  },

  {
    name: "Grupo J",

    teams: [
      { flag: "https://flagcdn.com/w40/ar.png", name: "Argentina" },
      { flag: "https://flagcdn.com/w40/dz.png", name: "Argélia" },
      { flag: "https://flagcdn.com/w40/at.png", name: "Áustria" },
      { flag: "https://flagcdn.com/w40/jo.png", name: "Jordânia" },
    ],

    matches: [
      {
        date: "16/06",
        time: "01:00",
        location: "Santa Clara",
        home: "Áustria",
        away: "Jordânia",
      },

      {
        date: "16/06",
        time: "22:00",
        location: "Kansas City",
        home: "Argentina",
        away: "Argélia",
      },

      {
        date: "22/06",
        time: "14:00",
        location: "Dallas",
        home: "Argentina",
        away: "Áustria",
      },

      {
        date: "23/06",
        time: "00:00",
        location: "Santa Clara",
        home: "Jordânia",
        away: "Argélia",
      },

      {
        date: "27/06",
        time: "23:00",
        location: "Kansas City",
        home: "Argélia",
        away: "Áustria",
      },

      {
        date: "27/06",
        time: "23:00",
        location: "Dallas",
        home: "Jordânia",
        away: "Argentina",
      },
    ],
  },

  {
    name: "Grupo K",

    teams: [
      { flag: "https://flagcdn.com/w40/pt.png", name: "Portugal" },
      { flag: "https://flagcdn.com/w40/cd.png", name: "RD Congo" },
      { flag: "https://flagcdn.com/w40/uz.png", name: "Uzbequistão" },
      { flag: "https://flagcdn.com/w40/co.png", name: "Colômbia" },
    ],

    matches: [
      {
        date: "17/06",
        time: "14:00",
        location: "Houston",
        home: "Portugal",
        away: "RD Congo",
      },

      {
        date: "17/06",
        time: "21:00",
        location: "Cidade do México",
        home: "Uzbequistão",
        away: "Colômbia",
      },

      {
        date: "23/06",
        time: "14:00",
        location: "Houston",
        home: "Portugal",
        away: "Uzbequistão",
      },

      {
        date: "23/06",
        time: "23:00",
        location: "Guadalajara",
        home: "Colômbia",
        away: "RD Congo",
      },

      {
        date: "27/06",
        time: "20:30",
        location: "Miami",
        home: "Colômbia",
        away: "Portugal",
      },

      {
        date: "27/06",
        time: "20:30",
        location: "Atlanta",
        home: "RD Congo",
        away: "Uzbequistão",
      },
    ],
  },

  {
    name: "Grupo L",

    teams: [
      { flag: "https://flagcdn.com/w40/gb.png", name: "Inglaterra" },
      { flag: "https://flagcdn.com/w40/hr.png", name: "Croácia" },
      { flag: "https://flagcdn.com/w40/gh.png", name: "Gana" },
      { flag: "https://flagcdn.com/w40/pa.png", name: "Panamá" },
    ],

    matches: [
      {
        date: "17/06",
        time: "17:00",
        location: "Dallas",
        home: "Inglaterra",
        away: "Croácia",
      },

      {
        date: "17/06",
        time: "20:00",
        location: "Toronto",
        home: "Gana",
        away: "Panamá",
      },

      {
        date: "23/06",
        time: "17:00",
        location: "Boston",
        home: "Inglaterra",
        away: "Gana",
      },

      {
        date: "23/06",
        time: "20:00",
        location: "Toronto",
        home: "Panamá",
        away: "Croácia",
      },

      {
        date: "27/06",
        time: "18:00",
        location: "Nova York",
        home: "Panamá",
        away: "Inglaterra",
      },

      {
        date: "27/06",
        time: "18:00",
        location: "Filadélfia",
        home: "Croácia",
        away: "Gana",
      },
    ],
  },
];
