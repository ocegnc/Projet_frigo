<script setup>
defineProps(["aliment"]);
defineEmits(["deleteA", "ajouterQte", "diminuerQte"])
</script>

<template>
    
    <v-list lines="one" id="liste">
        <v-row no-gutters>
            <v-col id="column1">
                <img :src="aliment.photo" style="width: 100px; height: 100px;" />
            </v-col>
            <v-col id="column2">
                <v-row no-gutters id="qte">
                    {{ aliment.showQte() }}
                </v-row>
                <v-row no-gutters >
                    <v-btn @click="$emit('ajouterQte', aliment)" icon="mdi-plus" variant="tonal" color="#FFCC66"></v-btn>
                    <v-btn @click="$emit('diminuerQte', aliment)" icon="mdi-minus" variant="tonal" color="#FFCC66"></v-btn>
                    <v-btn @click="$emit('deleteA', aliment.id)" icon="mdi-trash-can-outline" variant="tonal"
                        color="#FFCC66"></v-btn>
                </v-row>
                </v-col>
        </v-row>
    </v-list>

    </template>

<style scoped>
#liste {
    margin-left: 5%;
    
}

#qte{
    margin-left: 30px;
    text-align: center;
}

#column2{
    padding-left: 110px;
    padding-top: 15%;
}

#column1{
    margin-right: -70%;
    padding-top: 10%;

}
</style>    