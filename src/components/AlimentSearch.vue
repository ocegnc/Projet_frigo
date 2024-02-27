<script setup>
import { ref } from 'vue';
defineProps(["aliment"]);
defineEmits(["search", "exit"]);

const mot = ref('');

const exitSearch = () => {
    $emit('exit');
}

</script>

<template>
        <form @submit.prevent="$emit('search', mot)">
            <v-col>
                <v-row>
                    <div class="search">
                    <v-text-field color="#FFCC66" placeholder="rechercher ..." variant="outlined"
                        v-model="mot"></v-text-field>
                    </div>
                    <v-btn variant="text" type="submit" height="70%">
                        <v-img :width="50" aspect-ratio="1/1" cover
                            src="../assets/loupeOrange.png"></v-img>
                    </v-btn>
                </v-row>
            </v-col>
        </form>
</template>

<style>
.search {
    align-items: center;
    width: 170px;
}
</style>

