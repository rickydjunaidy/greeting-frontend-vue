<template>
    <div class="submit-form" style="text-align: center;">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="email_from">Sender Name</label>
          <input
            type="text"
            class="form-control"
            id="email-from"
            required
            v-model="form_data.email_from"
            name="email_from"
          />
        </div>
        <!-- <div v-if="!validated_email_from"> 
            <span style="color: red;">Please put correct email format!</span>
        </div> -->
  
        <div class="form-group" style="margin-bottom: 15px;">
          <label for="email_to">Email To</label>
          <input
            type="email"
            class="form-control"
            id="email-to"
            required
            v-model="form_data.email_to"
            name="email_to"
          />
        </div>
        <div v-if="!validated_email_to" style="margin-top:-15px !important;"> 
            <div style="color: red; ">Please put correct email format!</div>
        </div>

        <button style="margin-right:20px;" @click="sendMail" class="btn btn-success">Send Greeting!</button>
        <button @click="togglePreview" class="btn btn-success">Show/Hide Preview</button>
      </div>
  
      <div v-else>
        <h4>Your Greeting Card has been sent!</h4>
        <button style="margin-right:20px;" class="btn btn-success" @click="newSendMail">Send More!</button>
        <button @click="togglePreview" class="btn btn-success">Show/Hide Preview</button>
    </div>

      
      <div v-if="toggle_preview">
        <div v-html="form_data.content"></div>
      </div>  
    <!-- </div> -->
    </div>

  </template>
  
  <script>
  import DataService from "../services/data-services";
  
  export default {
    name: "send-mail",
    data() {
      return {
        form_data: {
            content: null,
            email_from: "",
            email_to: "",
        },
        submitted: false,
        toggle_preview: false,
        validated_email_from: true,
        validated_email_to: true
      };
    },
    /* eslint-disable */
    methods: {
      sendMail() {
        var data = {
            email_from: this.form_data.email_from,
            email_to: this.form_data.email_to
        };

        // this.validated_email_from = this.validateEmail(this.form_data.email_from)
        this.validated_email_to = this.validateEmail(this.form_data.email_to)

        if (!this.validated_email_from || !this.validated_email_to) {
            return
        }

        DataService.send_mail(data)
          .then(response => {
            this.form_data.content = response.data;
            console.log(response.data);
            this.submitted = true; //change this only for debug
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      newSendMail() {
        this.submitted = false;
        this.data = {};
        this.toggle_preview= false;
        this.validated_email_from= true;
        this.validated_email_to= true;
      },

      togglePreview() {
        if (!this.data) {
            DataService.get_mail([])
            .then(response => {
                this.form_data.content = response.data;
                // console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }
        this.toggle_preview = !this.toggle_preview;
      },

      validateEmail(email) {
        email = String(email)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return email ? true: false;
      }
    },
  }



  </script>
  
  <style>
  .submit-form {
    margin: auto;
  }
  </style>