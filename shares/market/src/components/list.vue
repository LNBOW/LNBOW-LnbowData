<template>
    <div class="list">
        <div class="listHeader" v-on:click="listshow">
            <h4>
            {{title}}
            </h4>
            <i class="cs-jt" v-if="flag"></i>
            <i class="cs-jts" v-if="!flag"></i>
            <div class="backg" v-if="flag" ></div>
        </div>
        <ul v-show="flag">
            <li v-bind:key='item.code' v-for="(item) in sharsvalue" class="cs-list">
            <ul>
                <li class="flex">
                <div class="flex-cl">
                    <p>{{item.name}}</p>
                    <div class="flex-js">
                    <a>{{item.mktType}}</a>
                    <p>{{item.code}}</p>
                    </div>
                </div>
                <span>{{item.close}}</span>
                <i>{{item.changePercent}}</i>
                </li>
            </ul>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: 'list',
    props: ["sharsvalue","title"],
  data () {
    return {
      flag:false,
      }
    },
    methods: {
    listshow:function(){
          this.flag = !this.flag;
        }
    }
  }
</script>