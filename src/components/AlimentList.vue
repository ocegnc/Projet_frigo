<script setup>
import { ref, reactive, onMounted } from "vue";
import AlimentItem from "./AlimentItem.vue";
import FrigoForm from "./FrigoForm.vue";
import AlimentSearch from "./AlimentSearch.vue";
import Aliment from "../Aliment.js";
import ItemSearch from "./ItemSearch.vue";

const drawer = ref(false); // booléen pour afficher/cacher la zone de gauche
const listeA = reactive([]);
const searchA = reactive([]);

// -- l'url de l'API
const url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/12/produits";

// req AJAX pour récupérer les aliments et les stocker dans le state listeC
function getAliments() {
    const fetchOptions = { method: "GET" };
    fetch(url, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            console.log(dataJSON);
            let textHTML = ""
            // -- vider la liste des aliments
            listeA.splice(0, listeA.length);
            // pour chaque donnée renvoyée par l'API
            //  créer un objet instance de la classe Aliment
            //  et l'ajouter dans la liste listeC
            dataJSON.forEach((v) => listeA.push(new Aliment(v.id, v.nom, v.qte, v.photo)));
        })
        .catch((error) => console.log(error));
}

//handle pour ajouter un nouvel aliment à partir du nom saisi dans le formulaire
function handlerAdd(nom, qte, photo) {
    console.log(nom);
    console.log(qte);
    console.log(photo);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let photoUrl;
    if (nom == "lait" || nom == "Tomates" || nom == "Jambon") {
        photoUrl = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/images/" + nom;
    } else {
        photoUrl = photo;
    }
    // --  le nom du nouvel aliment est envoyé au serveur via le body de la req AJAX
    const fetchOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ nom: nom, qte: qte, photo: photoUrl }),
    };
    fetch(url, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            console.log(dataJSON);
            getAliments();
        })
        .catch((error) => console.log(error));
}

// -- handle pour supprimer un aliment à partir de son id 
function handlerDelete(id) {
    console.log(id);
    const fetchOptions = {
        method: "DELETE",
    };
    // -- l'id de l'aliment à supprimer doit être ajouté à la fin de l'url
    fetch(url + "/" + id, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            console.log(dataJSON);
            getAliments();
            handlerSearch();
        })
        .catch((error) => console.log(error));
}

// -- handler pour ajouter un aliment à partir de l'index dans la liste
function handlerAddQte(al) {
    console.log(al);
    // -- ajouter +1 aliment
    al.ajouterQte();

    // -- entête http pour la req AJAX
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // -- l'aliment modifié est envoyé au serveur via le body de la req AJAX
    const fetchOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({ id: al.id, nom: al.nom, qte: al.qte, photo: al.photo }),
    };
    // -- la req AJAX
    fetch(url, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            console.log(dataJSON);
            // actualiser la liste des choses
            getAliments();
        })
        .catch((error) => console.log(error));
}

// -- handler pour diminuer un aliment à partir de l'index dans la liste
function handlerLessQte(al) {
    console.log(al);
    // -- diminuer -1 aliment
    al.diminuerQte();

    if (al.qte < 1) {
        handlerDelete(al.id);
    } else {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // -- l'aliment modifié est envoyé au serveur via le body de la req AJAX
        const fetchOptions = {
            method: "PUT",
            headers: myHeaders,
            body: JSON.stringify({ id: al.id, nom: al.nom, qte: al.qte, photo: al.photo }),
        };
        // -- la req AJAX
        fetch(url, fetchOptions)
            .then((response) => {
                return response.json();
            })
            .then((dataJSON) => {
                console.log(dataJSON);
                // actualiser la liste des choses
                getAliments();
            })
            .catch((error) => console.log(error));
    }
}

function handlerSearch(mot) {
    console.log(mot);
    const fetchOptions = {
        method: "GET"
    }
    fetch(url + "?search=" + mot, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            console.log(dataJSON);
            searchA.splice(0, searchA.length);
            if (mot == "") {
                searchA.value = [];
            } else {
                dataJSON.forEach((w) => searchA.push(new Aliment(w.id, w.nom, w.qte, w.photo)));
            }
        })
        .catch((error) => console.log(error));
}

// -- fonction du cycle de vie du composant exécutée 1 seule fois à la création
onMounted(() => {
    getAliments();
}); 
</script>

<template>
    <!-- une barre de navigation -->
    <v-app-bar color="rgb(253, 127, 1)" density="compact">
        <template v-slot:prepend>
            <!-- un clic sur l'icone cache/affiche la zone de menu de gauche -->
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>
            <FrigoHeader />
        </v-app-bar-title>
    </v-app-bar>

    <FrigoForm @addA="handlerAdd"></FrigoForm>

    <div class="ajouter">
        <h2>Liste des aliments</h2>
        <v-row no-gutters>
            <v-col id="grid" class="d-flex child-flex" v-for="aliment of listeA" :key="aliment.id" cols="40" sm="20" md="3"
                lg="3" xl="2">
                <v-card class="card" >
                    <AlimentItem :aliment="aliment" @ajouterQte="handlerAddQte" @diminuerQte="handlerLessQte"
                        @deleteA="handlerDelete" />
                </v-card>
                <!--   <AlimentItem v-for="aliment of listeA" :key="aliment.id" :aliment="aliment" @ajouterQte="handlerAddQte"
                @diminuerQte="handlerLessQte" @deleteA="handlerDelete" />
            -->
            </v-col>
        </v-row>
    </div>
    <div class="recherche">
        <v-navigation-drawer app v-model="drawer" color="#FFCC66">
            <AlimentSearch @search="handlerSearch" />
            <ul>
                <ItemSearch v-for="aliment of searchA" :key="aliment.id" :aliment="aliment" @ajouterQte="handlerAddQte"
                    @diminuerQte="handlerLessQte" @deleteA="handlerDelete" />
            </ul>
        </v-navigation-drawer>
    </div>
</template>

<style scoped>
h2 {
    color: rgb(253, 127, 1);
    padding-top: 5%;
    margin-left: 5%;
    padding-bottom: 50px;
}

.ajouter {
    padding-top: 400px;
}

.recherche {
    background: #FFCC66;
    bottom: 0;
}

#grid {
    grid-template-columns: 3;
}

.card{
    padding-bottom: 10%;
}
</style>
