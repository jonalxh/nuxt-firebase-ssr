<template>
  <div>
      <h1>
        Job list
      </h1>
      <ul>
        <li v-for="job in jobs" :key="job.pk">
          <nuxt-link :to="{ name: 'id', params: { id: job.pk } }">
            {{ job.title }}
          </nuxt-link>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jobs: [],
    }
  },
  async asyncData(context) {

    return await context.$axios
			.get("get-active-campaigns")
      // .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        // console.log("🚀 ~ file: index.vue ~ line 24 ~ returnawaitcontext.$axios.get ~ res", res.data);
        return { jobs: res.data }
      })
      .catch((err) => {
        console.log(
          '🚀 ~ file: index.vue ~ line 27 ~ returnawaitcontext.$axios.get ~ err',
          err
        )
      })
  },
}
</script>

<style scoped>
h3 {
  font-size: 50px;
}
</style>
