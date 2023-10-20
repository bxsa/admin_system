<template>
  <div>
    <Card></Card>
    <Sale></Sale>
    <Observe></Observe>
  </div>

</template>

<script>
import Card from "./Card";
import Sale from './Sale';
import Observe from './Observe';
export default {
  name: "",
  mounted(){
  },
  components: {
    Card,
    Sale,
    Observe,
  },
};
</script>

<style lang="scss" scoped></style>
