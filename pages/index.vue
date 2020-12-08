<template>
  <div class="container">
    <div>
      <h3 class="title">
        Job list
      </h3>
      <ul class="text-left">
        <li v-for="job in jobs" :key="job.pk">
          <nuxt-link :to="{ name: 'id', params: { id: job.pk } }">
            {{ job.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
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

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
