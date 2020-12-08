<template>
	<div>
		<h3>{{ job.title }}</h3>
		<b-img-lazy :src="getImgURL(job.image)"></b-img-lazy>
		<div v-html="job.description"></div>
	</div>
</template>

<script>
import getShareImage from "@jlengstorf/get-share-image";
import getSiteMeta from "~/utils/getSiteMeta.js";

export default {
	head() {
		return {
			title: this.job.title,
			description: this.job.description,
			image: this.socialImage, //`https://api.peaku.co/static/beta_invite/img/cel-${this.job.image}`,
			meta: [
				// ...this.meta,
				{ hid: "key", name: "key", content: this.job },
				{ hid: "og:title", name: "og:title", content: this.job.html_title },
				{ hid: "og:description", name: "og:description", content: this.job.html_meta_description },
				{ hid: "description", name: "image", content: this.socialImage },
				{ hid: "og-image", property: "og-image", content: this.socialImage },
				{
					property: "article:published_time",
					content: this.job.created_at,
				},
				{
					property: "article:tag",
					content: this.job.skills ? this.job.skills.toString() : "",
				},
				{ name: "twitter:label1", content: "By" },
				{ name: "twitter:data1", content: "PeakU" },
				{ name: "twitter:label2", content: "Required skills" },
				{
					name: "twitter:data2",
					content: this.job.skills ? this.job.skills.toString() : "",
				},
			],
			link: [
				{
					hid: "canonical",
					rel: "canonical",
					href: this.sharingUrl,
				},
			],
		};
    },
    jsonld() {
		return this.structuredData
	},
	data() {
		return {
			job: {},
			socialImage: null,
		};
	},
	async asyncData(context) {
		let id = context.params.id;
		//id = id.includes("-") ? id.split("-")[0] : id;

		const structuredData = await context.$axios.get(`get-google-structured-job-data/${id}`).then((res) => {
			return JSON.parse(res.data);
		});

		const job = await context.$axios
			.get(`get-campaign/${id}`)
			.then((res) => {
                // console.log("🚀 ~ file: _id.vue ~ line 70 ~ .then ~ res.data", res.data)
				return res.data;
			})
			.catch((err) => {
                console.log("🚀 ~ file: _id.vue ~ line 71 ~ asyncData ~ err", err)
			});

	    let socialImage;
		if (job.pk) {
			const title = job.title.replace(/[^\w.,\s]/g, "").toUpperCase();
			socialImage = getShareImage({
				title: title,
				tagline: job.skills.map((skill) => skill.name.charAt(0).toUpperCase() + skill.name.slice(1)).join("\n"),
				cloudName: "peaku",
				imagePublicID: "job-offer_lmulyd", //"jobOffer_xoefla",
				//titleFont: "Montserrat-Medium_qxgkxc.otf",
				titleExtraConfig: "_bold", //"_line_spacing_-10",
				taglineExtraConfig: "_bold",
				textExtraConfig: "_bold",
				//taglineFont: "montserrat.otf",
				titleLeftOffset: "75",
				titleFontSize: "62",
				taglineFontSize: "32",
				titleColor: "00C3FF",
				textColor: "000000",
				taglineColor: "595959",
				textLeftOffset: "620",
				titleBottomOffset: title.length <= 17 ? "600" : title.split(" ").length > 6 ? "470" : "530",
				taglineTopOffset: "350",
				imageWidth: "1080",
				imageHeight: "750",
				textAreaWidth: "950",
			});
			console.log("🚀 socialImage", socialImage);
		}
		return { job , socialImage, structuredData };
	},
	methods: {
		getImgURL(img) {
			if (img && !img.includes("http")) {
				return `https://peaku.co/img/${img}`;
			}
			return img;
		},
	},
};
</script>

<style lang="scss" scoped></style>
