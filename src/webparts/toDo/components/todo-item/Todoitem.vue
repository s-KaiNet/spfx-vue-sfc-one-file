<template>
    <li>
        <div class="view">
            <input type="checkbox" @click="onComplete">
            <label>{{todoText}}</label> 
        </div>
    </li>
</template>

<script lang="ts">
import * as Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class TodoItem extends Vue {
    @Prop
    public todoText: string;

    public onComplete(): void {
        this.$emit('completed', this.todoText);
    }
}
</script>

<style scoped lang="sass">
li {
    font-size: 30px;
}
</style>