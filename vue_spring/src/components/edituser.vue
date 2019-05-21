<template>
    <el-container>
      <el-header></el-header>
      <el-container style="width: 600px" v-loading="load">
        <el-main>
          <el-card>
            <p>     <h3>通讯录编辑</h3></p>
          <el-form ref="form" :model="form" label-width="80px" >
            <el-form-item label="ID">
              <el-input  :disabled="true" :value="id"></el-input>
            </el-form-item>
      <el-form-item label="用户名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>



            <el-form-item label="性别">
              <el-input v-model="form.sex"></el-input>
            </el-form-item>

            <el-form-item label="座机号">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="form.tel"></el-input>
            </el-form-item>

            <el-form-item label="地址">
              <el-input v-model="form.address"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
          </el-card>
        </el-main>
      </el-container>


    </el-container>
</template>

<script>
    export default {
        name: "edituser",
created(){

  let routerParams = this.$route.params.id

},
      mounted(){
          setTimeout(()=>{

            this.load=false
          },1000)

     this.id=window.sessionStorage.getItem("u_id")
      },

      data() {
        return {
          id:0,
          load:true,
          form: {
            name: '',
            sex:'',
            phone:'',
            tel:'',
            address:''
          }
        }
      },


      methods: {

        onSubmit() {
          this.load = true
          let params = new URLSearchParams();

          console.info(this.id)
          params.append('u_id', this.id+'');
          params.append('u_name', this.form.name+'');
          params.append('u_sex', this.form.sex+'');
          params.append('u_phone', this.form.phone+'');
          params.append('u_tel', this.form.tel+'');
          params.append('u_address', this.form.address+'');



          this.$ajax({
            method: 'post',
            url: '/api/edituser',
            data:params
          }).then((response) => {
            console.log(response)
            if (response.data != 0) {

              setTimeout(() => {
                this.load = false
                this.tableData = response.data
               this.$router.push("/")

              }, 800)


            } else {
              this.$message.error("failed")
            }
          },(error)=>{

            this.$message.error("Server has not Loaded! please Check out!"+error)

          })



        }
      }
    }
</script>

<style scoped>

</style>
