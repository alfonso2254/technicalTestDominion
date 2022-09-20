 <template>
    <div class="flex flex-wrap justify-center pt-10">
            <vs-button
                @click="$router.push({ name: 'Dashboard' })"
            >
                Back
            </vs-button>
            <h1 class="text-center text-5xl w-full mb-5 text-white">{{movieTitle}}</h1>

     
        <div class="w-full mt-5 md:mt-0 md:w-2/3 flex flex-wrap justify-between">
            <vs-card class="w-1/3 mb-2 -mx-1" v-for="(tr, indexTr) in peopleList" :key="indexTr">
                <template #title>
                <h3>{{tr.name}}</h3>
                </template>
                <template #text>
                    <div class="w-full flex justify-between px-5 py-2">
                    <p class="text-center font-bold">Height:</p>
                    <p class="text-center">{{  tr.height }}</p>
                </div>
                <div class="w-full flex justify-between px-5 py-2">
                    <p class="text-center font-bold">Mass:</p>
                    <p class="text-center">{{  tr.mass }}</p>
                </div>
                <div class="w-full flex justify-between px-5 py-2">
                    <p class="text-center font-bold">Hair Color:</p>
                    <p class="text-center">{{  tr.hair_color }}</p>
                </div>
                <div class="w-full flex justify-between px-5 py-2">
                    <p class="text-center font-bold">Skin Color:</p>
                    <p class="text-center">{{  tr.skin_color }}</p>
                </div>
                <div class="w-full flex justify-between px-5 py-2">
                    <p class="text-center font-bold">Eye Color:</p>
                    <p class="text-center">{{  tr.eye_color }}</p>
                </div>
                <div class="w-full flex justify-between px-5 py-2">
                    <p class="text-center font-bold">Birth Year:</p>
                    <p class="text-center">{{  tr.birth_year }}</p>
                </div>
                <div class="w-full flex justify-between px-5 py-2">
                    <p class="text-center font-bold">Gender:</p>
                    <p class="text-center">{{  tr.gender }}</p>
                </div>
                </template>
            </vs-card>
        </div>
    </div>
</template>
 <script>
import {
    BookmarkIcon,
    AlignCenterIcon,
    EditIcon,
    Trash2Icon,
} from "vue-feather-icons";
export default {
    components: {
        BookmarkIcon,
        AlignCenterIcon,
        EditIcon,
        Trash2Icon,
    },
    filters: {
        formatDate(date) {
            // format date to dd/mm/yyyy hh:mm
            if (date) {
                let d = new Date(date);
                let month = "" + (d.getMonth() + 1),
                    day = "" + d.getDate(),
                    year = d.getFullYear();
                let hours = d.getHours();
                let minutes = d.getMinutes();

                if (month.length < 2) month = "0" + month;
                if (day.length < 2) day = "0" + day;

                return [day, month, year].join("/") + " " + [hours, minutes].join(":");
            }
        },
    },
    data: () => ({
        movieTitle: "",
        peopleIds: [],
        peopleList: [],
    }),
    methods: {
        async indexMovies() {
            const loading = this.$vs.loading({
                target: this.$refs.tableList,
            });
            try {
                await this.$store.dispatch("Movies/index", this.search);
            } catch (e) {
                console.log(e);
            } finally {
                loading.close();
            }
        },
    },
    methods: {
        async showMovie(id) {
            const loading = this.$vs.loading({
                target: this.$refs.tableList,
            });
            try {
                await this.$store.dispatch("Movies/show", id);
                this.movieTitle = this.$store.state.Movies.movie.title;
                this.peopleIds = this.$store.state.Movies.movie.characters.map((url) => {
                    return url.split("people/").pop().replace("/", "");
                });
                console.log(this.peopleIds, "peopleIds")
                this.peopleIds.forEach(async (id) => {
                    const peoleData = await this.$store.dispatch("Movies/showPeople", id);
                    this.peopleList.push(peoleData);                    
                });
            } catch (e) {
                console.log(e);
            } finally {
                loading.close();
            }
        },
    },
    mounted() {
        if(this.$route.params.id){
            this.showMovie(this.$route.params.id);
        }
    },
};
</script>

