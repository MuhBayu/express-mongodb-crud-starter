<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      </label>
      <button v-on:click="submitFile()">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    /*
      Defines the data used by the component
    */
    data(){
      return {
        file: null
      }
    },
    methods: {
      submitFile(){
        /*
                Initialize the form data
            */
            let formData = new FormData();

            /*
                Add the form data we need to submit
            */
            formData.set('id', 5);
            formData.set('username', 'tess');
            formData.append('avatar', this.file);

        /*
          Make the request to the POST /single-file URL
        */
        axios.post('http://localhost:3000/api/upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(function(data){
            console.log(data);
            if(data.data.success) {
                console.info('SUCCESS!!');
                console.log(data.data.message)
            } else {
                console.info('FAILURE!!');
            }
        })
        .catch(function(){
          console.info('FAILURE!!');
        });
      },

      /*
        Handles a change on the file upload
      */
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }
    }
  }
</script>