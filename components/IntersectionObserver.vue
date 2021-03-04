<template>
  <div class="observer" style="display: block; height: 1px; width: 1px" />
</template>
<script>
export default {
  data() {
    return {
      observer: null,
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(this.onIntersect, {
      root: null,
      rootMargin: '0px 0px 100px 0px',
      threshold: 0,
    })

    this.observer.observe(this.$el)
  },

  destroyed() {
    this.observer.disconnect()
    this.observer = null
  },

  methods: {
    onIntersect(event) {
      const isIntersecting = event.find((entry) => {
        return entry.isIntersecting
      })
      if (isIntersecting) {
        this.$emit('intersect', event)
      }
    },
  },
}
</script>