<template>
  <div class="flex my-2">
    <span class="mr-2 font-semibold capitalize">siguenos</span>
    <a
      v-for="{ url, icon } in socialNetworks"
      :key="icon"
      :href="url"
      target="_blank"
      rel="external"
      class="mr-4 hover:text-red-500"
    >
      <Icon :name="icon" />
    </a>
  </div>
</template>

<script>
import Icon from "@/components/Icon.vue"

export default {
  name: "SocialNetworks",
  components: {
    Icon,
  },
  data() {
    return {
      socialNetworks: [
        {
          url: "https://www.facebook.com/Edisonmt-122132589381197/",
          icon: "facebook",
        },
        {
          url: "https://twitter.com/EdisonMatos30",
          icon: "twitter",
        },
        {
          url: "https://www.youtube.com/c/EdisonMT",
          icon: "youtube",
        },
      ],
    }
  },
}
</script>
