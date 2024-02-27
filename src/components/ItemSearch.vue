<script setup>
defineProps(["aliment"]);
defineEmits(["deleteA", "ajouterQte", "diminuerQte"])
</script>

<template>
    
    <v-list lines="one" id="liste">
        <v-row no-gutters>
            <v-col id="column1">
                <img :src="aliment.photo" style="width: 80px; height: 80px;"/>
            </v-col>
            <v-col id="column2">
                <v-row no-gutters id="qte">
                    {{ aliment.showQte() }}
                </v-row>
                <v-row no-gutters>
                    <v-btn @click="$emit('ajouterQte', aliment)" icon="mdi-plus" variant="tonal" color="black"></v-btn>
                    <v-btn @click="$emit('diminuerQte', aliment)" icon="mdi-minus" variant="tonal" color="black"></v-btn>
                    <v-btn @click="$emit('deleteA', aliment.id)" icon="mdi-trash-can-outline" variant="tonal"
                        color="red"></v-btn>
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
    padding-left: 20%;
}

#column2{
    margin-left: -25%;
}
</style>
