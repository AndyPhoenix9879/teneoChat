<template>
  <div class="container">
    <div class="contents">
      <h1><b>Virtual Partner</b></h1>
      <h2>Message Simulator</h2><br>
      Message Type: 
      <br>
      <div class="sub-title"></div>
        <el-autocomplete
          class="inline-input"
          v-model="state1"
          :fetch-suggestions="querySearch"
          placeholder="Select or type the Message Type"
          @select="handleSelect"
        ></el-autocomplete>
      <br><br>
      Message Content: <br>
      <el-input
        type="textarea"
        :rows="6"
        placeholder="Content of Message Type"
        v-model="msgContent">
      </el-input>
      
      <el-button type="primary" @click="submitHandler">Submit</el-button>
      
    </div>
  </div>
</template>

<script>
import { db } from '@/main.js'
export default {
    data() {
      return {
        links: [],
        state1: '',
        state2: '',
        msgContent: '',
        msgType: '',
      };
    },
    methods: {
      querySearch(queryString, cb) {
        var links = this.links;
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        // call callback function to return suggestions
        cb(results);
      },
      createFilter(queryString) {
        return (link) => {
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "Normal Message", "content": "You have received a new message!" },
          { "value": "Urgent Message", "content": "You have received an urgent new message!" },
          { "value": "Dispatch Message", "content": "You have received a new incident!" },
          { "value": "Emergency Button", "content": "Alert! A nearby officer has activated their emergency button!" },
          { "value": "HotHit", "content": "You have received a Hot Hit! A nearby officer has encountered a wanted person!" },
          { "value": "Facial Match", "content": "You have received a new facial match!" },
          { "value": "Plate Match", "content": "You have received a new vehicle plate match!" }
         ];
      },
      handleSelect(item) {
        this.msgType = item.value
        this.msgContent = item.content
      },
      submitHandler() {
        var msg = this.msgType;
        var usrInp = this.msgContent
        console.log(msg)
        this.state1 = '';
        this.msgContent = '';
        
        $.ajax({
          type: "POST",
          contentType: "application/x-www-form-urlencoded",
          url: "https://teammoto-2e4527.bots.teneo.ai/message_handling_0315tnfm559zzvzmghw7tsvskt/?viewtype=tieapi&userinput="+msg+"+"+usrInp,
          success: function(data, status, sessionID){
            console.log(data.output.text);
            console.log(sessionID.responseJSON.sessionId);
            console.log(status);
            
            db.ref("/message").set({
              messageType: msg,
              messageContent: data.output.text,
              sessionID: sessionID.responseJSON.sessionId,
              test: usrInp,
            });
          }
        })
        
      }
    },
    mounted() {
      this.links = this.loadAll();
    }
  }
</script>
<style>
.el-input{
  width: 350px !important;
}
.el-textarea__inner {
  display: inherit !important;
  width: 350px !important;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
h1 {
  padding: 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-button {
  margin-top: 10px;
}
.container {
  border-radius: 15px;
  background-color: #F2F6FC;
  height: 470px;
  width: 470px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 25px 0px rgba(82, 99, 175, 0.274);
}
.contents {
  margin: 20px;
}
</style>
