<template>
  <div class="">
    <div class="input-wrapper">
      <input 
        v-bind="$attrs" 
        placeholder=""
        @input="onInput"
        :class="{ 'error': props.error }" 
      />
      <label :class="{ 'raise': !!value }">{{ props.placeholder }}</label>
    </div>
    <div>
      <slot name="error" v-if="props.error">
        <span class="error">An Error occurred</span>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from "vue"

const props = defineProps({
  placeholder: String,
  error: Boolean
})

const value = ref('');

const emit = defineEmits(['update:modelValue']);

const onInput = (evnt) => {
  value.value = evnt.target.value;
  emit("update:modelValue", evnt.target.value)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-wrapper * {
  transition: all .3s;
}
.input-wrapper {
 position: relative;
 display: inline-block;
}

.input-wrapper label {
  position: absolute;
  top: 50%;
  left: 0%;
  padding: 0 20px;
  transform: translateY(-50%);
  user-select: none;
}

.input-wrapper input {
  padding: 16px 20px 8px 18px;
  background-color: transparent;
}

.input-wrapper input + label {
  z-index: -1;
}

.input-wrapper input:focus + label, .input-wrapper label.raise {
  font-size: small;
  top: 0px;
  padding-top: 4px;
  transform: translateY(0);
}

.input-wrapper input.error {
  border: 2px solid red;
}

span.error {
  color: rgb(219, 76, 76);
  font-size: small;
}
</style>
