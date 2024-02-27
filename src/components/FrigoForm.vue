<script setup>
import { ref } from "vue";
// -- donnée réactive pour la saisie du libellé

const emit = defineEmits(["addA"]);

const nom = ref("");
const qte = ref("");
const photo = ref("");

</script>

<template>
    <div id="center">
    <h2>Faites vos courses !</h2>
    <form @submit.prevent="$emit('addA', nom, qte, photo)">
    <v-row no-gutters>
            <v-col >
                <div class="formulaire">

                    <v-textarea clearable rows="1" label="Nom" color="orange" 
                        variant="outlined" v-model="nom"></v-textarea>
                    <v-textarea clearable rows="1" label="Quantité" color="orange" 
                        variant="outlined" v-model="qte"></v-textarea>
                    <v-textarea clearable rows="1" label="Photo" color="orange" 
                        variant="outlined" v-model="photo"></v-textarea>

                </div>
            
            </v-col>
            <v-col >
                <div class="ajout">
                <v-btn variant="text" type="submit" title="Ajouter au frigo">
                    <v-img :width="200" aspect-ratio="4/3" cover
                            src="../assets/frigo.png"></v-img>
                </v-btn>
            </div>
        
            </v-col>

        </v-row>
    </form>
    </div>
</template>

<style scoped>

h2{
    color: rgb(253, 127, 1);
    margin-left: 150px;
    padding-top: 10%;
}

.formulaire {
    padding-top: 20px;
    width: 500px;
    margin-left: 20px;
}

.textareas {
    height: 50px;
}

.ajout {
    padding-top: 20px;
    margin-left: -10px;
}

#center{
    align-items: center;
    position: absolute;
    left: 30%;
    top: 20%;
    transform: translate(-10%,-40%);
}
</style>

