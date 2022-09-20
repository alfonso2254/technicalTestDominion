 <template>
    <div class="flex flex-wrap justify-center pt-10">
        <h1 class="text-center text-5xl w-full mb-5 text-white">Movies List</h1>

     
        <div class="w-full mt-5 md:mt-0 md:w-1/2">
            <vs-table class="bg-white" ref="tableList">
                <template #header>
                    <vs-input v-model="search" placeholder="Search Title" state="dark" class="block" />
                </template>
                <template #thead>
                    <vs-tr>
                        <vs-th> Title </vs-th>
                        <vs-th> Episodes </vs-th>
                        <vs-th> Director </vs-th>
                        <vs-th> Producer </vs-th>
                        <vs-th> Release Date </vs-th>
                        <vs-th> Created </vs-th>
                        <vs-th> Edited </vs-th>
                    </vs-tr>
                </template>
                <template #tbody>
                    <vs-tr color="" :key="i" v-for="(tr, i) in moviesList.results" :data="tr">
                        <vs-td @click="showMovie(tr)" class="slectMovie">
                            {{ tr.title }}
                        </vs-td>
                        <vs-td>
                            {{ tr.episode_id }}
                        </vs-td>
                        <vs-td>
                            {{ tr.director }}
                        </vs-td>
                        <vs-td>
                            {{ tr.producer }}
                        </vs-td>
                        <vs-td class="text-nowrap">
                            {{ tr.release_date | formatDate }}
                        </vs-td>
                        <vs-td class="text-nowrap">
                            {{ tr.created | formatDate }}
                        </vs-td>
                        <vs-td class="text-nowrap">
                            {{ tr.edited | formatDate }}
                        </vs-td>
                    </vs-tr>
                </template>
                <template #footer>
                    <vs-pagination v-model="page" :length="1" />
                </template>
            </vs-table>
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
        search: "",
        page: 1,
        setTimeOutSearch: null,
    }),
    computed: {
        moviesList() {
            return this.$store.state.Movies.movies;
        },
    },
    methods: {
        showMovie(movie) {
            this.$router.push({
                name: "ShowMovie",
                params: {
                    id: movie.episode_id,
                },
            });
        },
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
    watch: {
        search() {
            clearTimeout(this.setTimeOutSearch);
            this.setTimeOutSearch = setTimeout(() => {
                this.indexMovies();
            }, 500);
        },
    },
    mounted() {
        this.indexMovies();
    },
};
</script>

<style scoped>
.slectMovie {
    cursor: pointer;
    color: #3c87c0;
}
.slectMovie:hover {
    color: #3c87c0;
    text-decoration: underline;
}
</style>

