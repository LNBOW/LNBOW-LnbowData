import {VIEW_LOADING,UPDATE_INDEX,ADD_USER} from './types';
import axios from 'axios';
export default {
  [VIEW_LOADING]:({commit,state},payload)=>{commit(VIEW_LOADING,payload)}, 
  ['UPDATE_USER']:({commit,state},payload)=>{commit('UPDATE_USER',payload)}, 
  [UPDATE_INDEX]:({commit,state})=>{
    //....payload== 请求参数->axios 请求->commit->mutations
    axios({
      url:'/static/data/index.data'
    }).then(
      res=>commit(UPDATE_INDEX,res.data)
    )
  },
  [ADD_USER]:({commit,state},payload)=>{
    //....payload== 请求参数->axios 请求->commit->mutations
    axios({
      url:'/static/data/user.json'
    }).then(
      (res)=>{
        // console.log(res.data.data[0].userdata.username,payload)
        if(res.data.data.length == 0){
          res.data.data.push(
            {
              "username":payload.name,
              "password":payload.pass
            }
          )
          commit(ADD_USER,res.data.data);
        }else{for(let i = 0;i < res.data.data.length;i++){
          if(res.data.data[i].userdata.username != payload.name){
            res.data.data.push(
              {
                "username":payload.name,
                "password":payload.pass
              }
            )
            commit(ADD_USER,res.data.data);
          }
        }
      }
      }
    )
  },
  
}




