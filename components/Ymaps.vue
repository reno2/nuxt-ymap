<template>
  <div class="ymap">
    <div class="ymap_map" id="map" style="width:550px;height:500px"></div>
    <a
      v-if="btnNearest"
      @click.prevent="findClosest"
      class="ymap_nearest btn green ymap_btn"
    >
      Показать ближайшую
    </a>
  </div>
</template>

<script>
import { ymapLoader, getBrowserLocation } from "~/helpers/ymaps";
export default {
  props: {
    coords: {
      type: Array
    },
    btnNearest: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: null
    },
    zoom: {
      type: Number,
      default: 13
    }
  },
  data: () => ({
    initialize: false,
    img: require("~/assets/pin.png")
  }),
  computed: {
    filterItems: function() {
      // if (!this.items) return;
      console.log(this.items);
      const toMap = this.items.map(item => {
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: item.COORD.split(","),
            id: item.ID
          },
          options: {
            name: item.NAME,
            apteca: this.checkBy("NAME", "Аптека", item.DOP),
            iconLayout: "default#image",
            iconImageHref: this.img,
            iconImageSize: [49, 52],
            iconImageOffset: [-20, -45]
          }
        };
      });
      return toMap;
    }
  },
  methods: {
    async findClosest() {
      try {
        const coords = await getBrowserLocation(),
          storage = ymaps.geoQuery(this.myMap.geoObjects),
          closestOdj = storage.getClosestTo(coords),
          newCoords = closestOdj.geometry.getCoordinates();
        this.myMap.setCenter(newCoords, this.zoom, {
          checkZoomRange: true
        });
      } catch (err) {
        alert(err.message); // TypeError: failed to fetch
      }
    },
    checkBy(field, value, data) {
      if (!data) return false;
      const res = data.filter(el => {
        return el && el[field] === value;
      });
      return !!res.length;
    },

    prepearPoints() {
      const toMap = this.items.map(item => {
        // console.log(item);
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: item.COORD.split(","),
            id: item.ID
          },
          options: {
            name: item.NAME,
            apteca: this.checkBy("NAME", "Аптека", item.DOP),
            iconLayout: "default#image",
            iconImageHref: this.img,
            iconImageSize: [49, 52],
            iconImageOffset: [-20, -45]
          }
        };
      });
      return toMap;
    },
    init() {
      const myMap = new ymaps.Map("map", {
        center: this.coords,
        zoom: 10,
        controls: []
      });

      const points = this.prepearPoints();
      if (points) {
        window.myObjects = ymaps
          .geoQuery({
            type: "FeatureCollection",
            features: points
          })
          .addToMap(myMap);
        this.myMap = myMap;
        this.initialize = true;
      }
    }
  },
  async mounted() {
    await ymapLoader({ debug: true });
    window.ymaps.ready(this.init);
  }
};
</script>

<style scoped>
.ymap {
  position: relative;
}
.ymap_nearest {
  position: absolute;
  bottom: 60px;
  left: 16px;
}
.ymap_btn {
  background: #eae419;
}
</style>