<template>
  <div class="container">
    <div class="items">
      <transition-group name="company" mode="out-in" tag="div" class="items">
        <div
          class="items_item"
          v-for="(element, inx) of filteredOffices"
          :key="element.ID"
        >
          <div class="items_itemLine">
            <span class="items_itemName">название: </span>
            <span class="items_itemName" v-html="element.NAME"></span>
          </div>
          <div class="items_itemLine">
            <span class="items_itemName">услуги: </span>
            <span class="items_itemDop" v-for="dop in element.DOP">{{
              dop.NAME
            }}</span>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="map">
      <div class="map__filter">
        <div class="offices_tags" v-if="renderTags">
          <div class="offices_tagsUl">
            <div class="offices_tagsLi">
              <input
                @click="checkAll"
                :checked="selectedAll"
                type="checkbox"
                id="all"
              />
              <label class="offices_tagsLabel" for="all">Все отделения</label>
            </div>
            <div
              v-for="(tag, i) of renderTags"
              :key="tag.CODE"
              class="offices_tagsLi"
            >
              <input
                @change="tag.checked = !tag.checked"
                v-model="selectedTag"
                type="checkbox"
                :value="tag.CODE"
                :id="tag.CODE"
              />
              <label class="offices_tagsLabel" :for="tag.CODE"
                >{{ tag.NAME }}
              </label>
            </div>
          </div>
        </div>
      </div>
      <Ymaps
        :items="filteredOffices"
        :btnNearest="true"
        :coords="coords"
        :filter="mapFilter"
      ></Ymaps>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Ymaps from "~/components/Ymaps.vue";

export default {
  data: () => ({
    coords: [59.967515, 30.274616],
    selectedAll: true,
    selectedTag: []
  }),
  async asyncData({ store }) {
    if (store.getters["maps/getOffices"].length === 0) {
      await store.dispatch("maps/fetch");
    }
  },
  computed: {
    ...mapGetters("maps", ["getOffices"]),
    ...mapState({
      offices: state => state.maps.offices
    }),
    mapFilter() {
      return this.filteredOffices.map(el => el.ID);
    },
    filteredOffices() {
      let offices = this.offices;
      if (this.selectedTag.length) {
        this.selectedAll = false;
        offices = offices
          .filter(ta => {
            if (!!ta.DOP) return ta;
          })
          .filter(g => {
            return g.DOP.some(v => {
              return this.selectedTag.includes(v.CODE);
            });
          });
      } else {
        this.selectedAll = true;
      }
      return offices;
    },
    renderTags() {
      let g = [];
      this.offices.filter(first => {
        if (first.DOP) {
          first.DOP.map(el => g.push(el));
        }
      });
      return g.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj["CODE"]).indexOf(obj["CODE"]) === pos;
      });

      //   return Object.values(
      //     this.offices
      //       .flatMap(n => n.DOP)
      //       .reduce((acc, n) => (n && (acc[n.NAME] = n), acc), {})
      //   );
    }
  },
  methods: {
    checkAll(e) {
      if (this.selectedTag.length) {
        this.renderTags.forEach(tag => (tag.checked = false));
        this.selectedTag = [];
      }
      this.selectedAll = true;
      event.target.checked = true;
    }
  },
  components: {
    Ymaps
  },
  async mounted() {
    // this.offices =
  }
};
</script>

<style>
.map {
  /* min-width: 100%; */
  background: #eee;
  height: 100%;
  display: block;
  min-height: 500px;
  margin-top: 13px;
  position: sticky;
  top: 13px;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.items {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  min-width: 570px;
}
.items_item {
  width: 47%;
  margin: 10px 5px;
  background: #eee;
  padding: 10px;
  border-radius: 6px;
}
.items_itemLine {
}
.items_itemName {
  font-size: 12px;
}
.items_itemDop {
  text-transform: lowercase;
  font-size: 12px;
  font-weight: 500;
  margin-right: 8px;
  background: #eae41c;
  padding: 0px 5px 3px;
  border-radius: 5px;
  line-height: 12px;
  color: #000;
}
.offices_tags {
  margin: 16px;
}
.offices_tagsUl {
  display: flex;
  justify-content: space-between;
}
.company-move {
  transition: all 600ms ease-in-out 50ms;
}
.company-enter-active {
  transition: all 300ms ease-out;
}
.company-leave-active {
  transition: all 300ms ease-in;
  position: absolute;
  width: 280px;
  z-index: -1;

  bottom: 0;
}
.company-enter,
.company-leave-to {
  opacity: 0;
}
.company-enter {
  transform: scale(0.9);
}
</style>
