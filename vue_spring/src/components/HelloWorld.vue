<template>

  <el-container  v-loading="load" element-loading-text="获取数据中...">
    <el-header>通讯录演示效果[Vue+Springboot+mybatis+mysql]</el-header>
    <el-main  >

      <el-container style="width: 1200px;margin: 0 auto">


        <div class="flex-container">
          <div class="flex-item" style="margin: 0 !important;">

            <el-input v-model="tableDataName" placeholder="请输入姓名" style="width:240px"></el-input></div>
          <div class="flex-item"> <el-input v-model="tableDataName2" placeholder="请输入座机" style="width:240px"></el-input></div>
          <div class="flex-item"></div>
          <el-button-group>
            <router-link :to="{path:'/adduser'}"><el-button style="display: inline-block" class="el-button--primary" >   新增   </el-button> </router-link>
                  <el-button style="" class="el-button--primary" @click="doFilter">查询</el-button></el-button-group>
        </div>



        <el-table

        :data="tableDataEnd"
          style="width: 100%">


          <el-table-column
            label="Id"
            prop="id">
          </el-table-column>
          <el-table-column
            label="Name"
            prop="name">
          </el-table-column>


          <el-table-column
            label="Sex"
            prop="sex">
          </el-table-column>
          <el-table-column
            label="Phone"
            prop="phone">
          </el-table-column>
          <el-table-column
            width="150px"
            label="Tel"
            prop="tel">
          </el-table-column>
          <el-table-column
            width="300px"
            label="Address"
            prop="address">
          </el-table-column>
          <el-table-column width="200px" label="Operate">
            <template slot-scope="scope">
              <router-link :to="{path:'/edituser?id='+parseInt(scope.$index+1)}">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑          </el-button>

            </router-link>


              <router-link :to="{path:'/'}"> <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除          </el-button>
              </router-link>


            </template>





          </el-table-column>


        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalItems">
        </el-pagination>
        <el-footer>

        </el-footer>


      </el-container>

    </el-main>
  </el-container>


</template>

<script>
  export default {
    data() {
      return {
        search:'',
        u_id:0,
        load: false,
        tableDataEnd:[],
        tableDataBegin: [{
          id: '',
          name: '',
          sex: '',
          address: ''
        }],
        search: '',
        loadfaild:false,
        form: {
          name: '111',
          region: '11',
          date1: '11',
          date2: '111',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        dialogTableVisible: false,
        dialogFormVisible: false,
        currentPage: 1,
        pageSize: 9,
        totalItems: 0,
        filterTableDataEnd:[],
        flag:false,
        tableDataName:'',
        tableDataName2:''

      }
    },
    created(){



    },
    computed:{
      tables:function(){
        let search=this.search;
        if(search){
          return  this.tableDataEnd.filter(function(dataNews){
            return Object.keys(dataNews).some(function(key){
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.tableDataEnd
      }

    },
    mounted() {


      setTimeout(() => {
        this.submit()

      }, 1000)




    },
    methods: {
      doFilter() {
        this.load=true
        if (this.tableDataName == "" && this.tableDataName2 == ""  ) {
          // this.$message.warning("查询条件不能为空！");
          this.submit()
          return;
        }
        this.tableDataEnd = []
        //每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd=[]
        this.tableDataBegin.forEach((value, index) => {
          if(value.name){  //根据字段帅选value.字段.indexOf(this.模型)
            if(value.name.indexOf(this.tableDataName)>=0 && value.phone.indexOf(this.tableDataName2)>=0

            ){
              //console.info("tableDataName2"+value.phone.indexOf(this.tableDataName2))


              this.filterTableDataEnd.push(value)
            }
          }
        });
        //页面数据改变重新统计数据数量和当前页
        this.currentPage=1
        this.totalItems=this.filterTableDataEnd.length
        //渲染表格,根据值
        this.currentChangePage(this.filterTableDataEnd)
        //页面初始化数据需要判断是否检索过
        this.flag=true
        this.load=false
      },

      handleEdit(index, row) {


        window.sessionStorage.setItem("u_id",parseInt(index+1))
        console.log(index, row);
      },
      handleDelete(index, row) {
        let params = new URLSearchParams();
        this.load = true
        console.info("del => index:"+this.tableDataEnd[index].id)
        params.append('u_id', this.tableDataEnd[index].id+'');

        this.$ajax({
          method: 'post',
          url: '/api/deluser',
          data:params
        }).then((response) => {
          console.log(response)
          if (response.data != 0) {

            setTimeout(() => {
              this.load = false
              this.submit()
              this.$router.push("/")

            }, 800)


          } else {
            this.$message.error("failed")
          }
        },(error)=>{

          this.$message.error("Server has not Loaded! please Check out!"+error)

        })


        console.log(index, row);
      },
      submit() {
        this.load = true
        this.$ajax({
          method: 'get',
          url: '/api/getuser',
        }).then((response) => {
          console.log(response)
          if (response.data != null) {

            setTimeout(() => {
              this.load = false
              this.tableDataBegin = response.data
              console.log("tableDataBegin=> "+  this.tableDataBegin )




              console.info("tableDataBegin:  "+this.tableDataBegin.length)
              this.totalItems = this.tableDataBegin.length;
              console.info("totalItems"+this.totalItems)
              if (this.totalItems > this.pageSize) {
                for (let index = 0; index < this.pageSize; index++) {
                  this.tableDataEnd.push(this.tableDataBegin[index]);

                }
              } else {
                this.tableDataEnd = this.tableDataBegin;
              }
              console.info("tableDataEnd  "+this.tableDataEnd.size)
              console.info(this.tableDataEnd)





            }, 800)


          } else {
            this.$message.error("failed")
          }
        },(error)=>{

          this.$message.error("Server has not Loaded! please Check out!"+error)

        })







      },  handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.handleCurrentChange(1);
      },
      filter(){
        console.log(this.search)
        this.tableDataEnd.filter(
          function(dataNews){
          return Object.keys(dataNews).some(function(key){
            return String(dataNews[key]).toLowerCase().indexOf(this.search) > -1
          })
        })
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        //需要判断是否检索
        if (!this.flag) {
          this.currentChangePage(this.tableDataBegin);
          console.log(this.tableDataEnd);
        } else {
          this.currentChangePage(this.filterTableDataEnd);
          console.log(this.tableDataEnd);
        }
      },//组件自带监控当前页码

      currentChangePage(list) {
        let from = (this.currentPage - 1) * this.pageSize;
        let to = this.currentPage * this.pageSize;
        this.tableDataEnd = [];
        for (; from < to; from++) {
          if (list[from]) {
            this.tableDataEnd.push(list[from]);
          }
        }
      }

    }


  }
</script>
<style>
  .flex-container{
    display: flex;
    justify-content: left;
    width: 100%;
    height: 40px;

  }
  .flex-container .flex-item{
    width: 250px;
    height: 35px;
    margin-left:50px;
  }



</style>
