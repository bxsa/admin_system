<template>
    <div>
   <div class="card-header">
    <span>{{ this.title }}</span>
    <svg t="1695114611519" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4278" width="16" height="16"><path d="M872.746667 573.866667a18.858667 18.858667 0 0 0-22.058667 15.445333 322.901333 322.901333 0 0 1-318.464 266.368c-178.389333 0-323.498667-145.066667-323.498667-323.498667a323.413333 323.413333 0 0 1 591.701334-180.906666 319.829333 319.829333 0 0 1 50.261333 123.818666 19.072 19.072 0 0 0 37.461333-6.656A356.949333 356.949333 0 0 0 832 329.984 361.301333 361.301333 0 0 0 532.224 170.666667 361.429333 361.429333 0 0 0 170.666667 532.181333c0 199.381333 162.218667 361.557333 361.557333 361.557334a360.874667 360.874667 0 0 0 355.925333-297.770667 19.029333 19.029333 0 0 0-15.36-22.058667" fill="#3C405D" p-id="4279"></path><path d="M532.224 411.306667a20.138667 20.138667 0 0 0-20.138667 20.181333v322.133333a20.138667 20.138667 0 0 0 40.277334 0v-322.133333a20.138667 20.138667 0 0 0-20.138667-20.181333M552.362667 310.613333a20.138667 20.138667 0 0 0-40.277334 0v40.277334a20.138667 20.138667 0 0 0 40.277334 0v-40.32z" fill="#3C405D" p-id="4280"></path></svg>
</div>
   <div class="card-content">{{ this.count }}</div>
   <div class="card-charts">
    <slot name="charts"></slot>
   </div>
   <div class="card-footer">
        <slot name="footer"></slot>
   </div>
</div>
</template> 

<script>

export default {
  name: "detail",
  props:['title',"count"],

 
}
</script>

<style  scoped>
.card-header{
    display:flex;
    justify-content: space-between;
    color:#d9d9d9;
    font-size:16;
}
.card-content{
    font-size:30px;
    padding:10px 0px;
}
.card-charts{
    height:50px;
}
.card-footer{
    height:30px;
    padding-top:10px;
}
</style>

