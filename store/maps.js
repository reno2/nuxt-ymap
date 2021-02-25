export const state = () => ({
  offices: [],
  offices2: [
    {
      METRO: [{ NAME: "Комендантский проспект", CODE: "purple" }],
      DOP: [
        { NAME: "Аптека", CODE: "icon-apteka" },
        { NAME: "Травматология", CODE: "icon-travma" },
        { NAME: "Стационар", CODE: "icon-stazionar" }
      ],
      ID: "3",
      NAME: "Отделение &quot;Северное&quot;",
      WORK: "пн-вс: 9:00 - 21:00\r\nтравмпункт: круглосуточно\r\n\r\n",
      ANALIZ: "пн-вс: с 8:00 до 20:00",
      ADDRESS: "Санкт-Петербург, 197372, ул. Ильюшина, 4/1",
      COORD: "60.00637346968,30.254479974204",
      PHONE: "+7 (812) 600-77-77"
    },
    {
      METRO: [
        { NAME: "Гостиный двор", CODE: "blue" },
        { NAME: "Маяковская", CODE: "green" }
      ],
      DOP: [
        { NAME: "Аптека", CODE: "icon-apteka" },
        { NAME: "Травматология", CODE: "icon-travma" },
        { NAME: "Стационар", CODE: "icon-stazionar" }
      ],
      ID: "4",
      NAME: "Отделение &quot;Центральное&quot;",
      WORK: "пн-вс: c 9:00 до 21:00\r\nтравмпункт: круглосуточно\r\n\r\n",
      ANALIZ: "Прием анализов: пн-вс  08:00-20:00",
      ADDRESS: "Санкт-Петербург, 191014, Литейный пр., 55А",
      COORD: "59.935620751817,30.346451736771",
      PHONE: "+7 (812) 600-77-77"
    },
    {
      METRO: [{ NAME: "Чернышевская", CODE: "red" }],
      DOP: [{ NAME: "Аптека", CODE: "icon-apteka" }],
      ID: "38",
      NAME: "Отделение &quot;Парадный квартал&quot;",
      WORK:
        "ПН-ВС: с 10:00 - 18:00\r\n\r\nДетское отделение временно не работает.",
      ANALIZ: "",
      ADDRESS: "Санкт-Петербург, 191015, ул. Парадная, 7",
      COORD: "59.941449452794,30.370629208004",
      PHONE: "+7 (812) 445-81-00"
    },
    {
      METRO: [{ NAME: "Проспект Ветеранов", CODE: "red" }],
      DOP: [{ NAME: "МРТ", CODE: "icon-mrt" }],
      ID: "39",
      NAME: "Отделение &quot;Кировское&quot;",
      WORK: "пн-сб: с 10:00 до 18:00\r\nвс: выходной день\r\n",
      ANALIZ: "",
      ADDRESS: "Санкт-Петербург, 198217, ул. Танкиста Хрустицкого, 9",
      COORD: "59.838188764103,30.250207042328",
      PHONE: "+7 (812) 600-78-22"
    },
    {
      METRO: [{ NAME: "Беговая", CODE: "green" }],
      ID: "40",
      NAME: "Отделение &quot;Приморское&quot;",
      WORK: "пн-сб: с 10:00 до 18:00\r\nвс: выходной день\r\n\r\n",
      ANALIZ: "",
      ADDRESS: "Санкт-Петербург, 197374, ул. Савушкина, 133/1",
      COORD: "59.988282573129,30.21164725264",
      PHONE: "+7 (812) 600-78-23"
    },
    {
      ID: "41",
      NAME: "Отделение &quot;Курортное&quot;",
      WORK: "пн-сб: с 10:00 до 18:00\r\nвс: выходной день\r\n\r\n\r\n",
      ANALIZ: "",
      ADDRESS: "Санкт-Петербург, г. Сестрорецк, 197706, ул. Борисова, 10",
      COORD: "60.101834491306,29.969331737434",
      PHONE: "+7 (812) 600-78-27"
    },
    {
      METRO: [{ NAME: "Московская", CODE: "blue" }],
      DOP: [
        { NAME: "Аптека", CODE: "icon-apteka" },
        { NAME: "Травматология", CODE: "icon-travma" }
      ],
      ID: "42",
      NAME: "Отделение &quot;Московское&quot;",
      WORK: "пн-вс: с 09:00 до 21:00\r\n\r\n",
      ANALIZ: "пн.-вс: с 08:00 до 11:30, ",
      ADDRESS: "Санкт-Петербург, 196066, Московский пр., 193/2",
      COORD: "59.851047,30.319797",
      PHONE: "+7 (812) 600-77-77"
    },
    {
      METRO: [{ NAME: "Озерки", CODE: "blue" }],
      DOP: [
        { NAME: "Аптека", CODE: "icon-apteka" },
        { NAME: "Травматология", CODE: "icon-travma" }
      ],
      ID: "43",
      NAME: "Отделение &quot;Озерки&quot;",
      WORK:
        "пн-вс: 9:00 - 21:00\r\nтравмпункт: \r\nпн-вс: 9:00 - 21:00\r\n\r\n",
      ANALIZ: "пн-сб: с 8:00 до 11:30, вск. с 8:00 до 11:30",
      ADDRESS: "Санкт-Петербург, 194354, Учебный пер., 2",
      COORD: "60.039483170536,30.333072490738",
      PHONE:
        "+7 (812) 600-78-25 (взрослое отделение) +7 (812) 600-78-52 (детское отделение)"
    },
    {
      METRO: [
        { NAME: "Международная", CODE: "purple" },
        { NAME: "Ломоносовская", CODE: "green" },
        { NAME: "Проспект Славы", CODE: "blue" }
      ],
      ID: "44",
      NAME: "Отделение &quot;Фрунзенское&quot;",
      WORK: "пн-сб: с 10:00 до 18:00\r\nвс: выходной день\r\n",
      ANALIZ: "",
      ADDRESS: "Санкт-Петербург, 192241, пр. Славы, 52",
      COORD: "59.864963001264,30.410445026167",
      PHONE: "+7 (812) 600-78-26"
    },
    {
      METRO: [{ NAME: "Приморская", CODE: "green" }],
      ID: "45",
      NAME: "Отделение &quot;Василеостровское&quot;",
      WORK:
        "пн-сб: с 10:00 до 18:00\r\nприем анализов:\r\nпн-сб: с 10:00 до 15:00",
      ANALIZ: "",
      ADDRESS: "Санкт-Петербург, 199397, ул. Беринга, 27",
      COORD: "59.945158887209,30.237482433205",
      PHONE: "+7 (812) 600-78-28"
    },
    {
      METRO: [{ NAME: "Ломоносовская", CODE: "green" }],
      ID: "48",
      NAME: "Отделение МРТ/КТ",
      WORK:
        "Отделение МРТ: \r\nвт, чт, сб:  09:00 - 20:00\r\nОтделение КТ\r\nпн-вс: 09:00 - 20:00\r\n",
      ANALIZ: "нет",
      ADDRESS: "Санкт-Петербург, 193079, ул. Народная, 21, к. 2",
      COORD: "59.879219833342,30.468089940475",
      PHONE: "+7 (812) 600-78-78"
    },
    {
      METRO: [{ NAME: "Фрунзенская", CODE: "blue" }],
      ID: "17632",
      NAME: "Отделение &quot;Обводный канал&quot;",
      WORK: "Отделение временно не работает",
      ANALIZ: "",
      ADDRESS: "Санкт-Петербург, 196084, Московский пр., 73, к. 4",
      COORD: "59.90477,30.316236",
      PHONE: "+7 (812) 445-62-09"
    },
    {
      ID: "471526",
      NAME: "Скорая помощь",
      WORK: "КРУГЛОСУТОЧНО",
      ANALIZ: "",
      ADDRESS: "",
      COORD: "",
      PHONE: "+7(812)600-77-70"
    },
    {
      METRO: [{ NAME: "Парнас", CODE: "blue" }],
      ID: "8108129",
      NAME: "Отделение &quot;Парнас&quot;",
      WORK: "Отделение временно не работает",
      ANALIZ: "",
      ADDRESS:
        "Санкт-Петербург, 194358, посёлок Парголово, ул. Валерия Гаврилина, 11, к. 1",
      COORD: "60.078644557157,30.337440407409",
      PHONE: "+ 7 (812)600-77-77"
    },
    {
      METRO: [{ NAME: "Чкаловская", CODE: "purple" }],
      ID: "8108132",
      NAME: "Отделение &quot;Петроградское&quot;",
      WORK: "пн-сб: с 10:00 до 18:00\r\nвс: выходной день\r\n\r\n\r\n\r\n",
      ANALIZ: "",
      ADDRESS: "Санкт-Петербург, 197110, ул. Малая Зеленина, 1/22",
      COORD: "59.962434999802,30.282560440475",
      PHONE: "+ 7 (812)600-77-77"
    },
    {
      METRO: [{ NAME: "Комендантский проспект", CODE: "purple" }],
      ID: "9715954",
      NAME: "Родильный Дом",
      WORK: "круглосуточно\r\nпосещение: с 9:00 до 21:00",
      ANALIZ: "",
      ADDRESS: "Санкт-Петербург, ул. Ильюшина 4 к.2",
      COORD: "60.006578497966,30.254164460885",
      PHONE: "+7 (812) 600-77-77"
    }
  ]
});
export const actions = {
  async fetch({ commit, getters }) {
    try {
      const elements = await this.$axios.$get(
        "http://www.avaclinic.loc/offices/nuxt.php"
      );
      commit("ADD_ADDRESSES", elements.data);
    } catch (e) {}
  }
};
export const mutations = {
  ADD_ADDRESSES: function(state, data) {
    state.offices = data;
  }
};
export const getters = {
  getOffices: state => state.offices
};
