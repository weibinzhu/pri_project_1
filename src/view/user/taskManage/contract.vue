<template>
  <div class="contractWrapper">
    <loading v-show="isLoading"></loading>
    <v-header title="合同详情"></v-header>
    <div class="priceBlock">
      <div class="title">项目总金额 （元）</div>
      <!--<div class="price">￥{{price}}</div>-->
      <div class="price"><input v-model="price" v-addMoneyIcon class="price" type="text" placeholder="请输入项目总金额"/></div>
    </div>

    <div class="contractBlock">
      <div class="header">项目合同</div>
      <div class="contractItemWrapper">
        <!--<div class="contractItem" v-if="contract.isExist">-->
        <!--<div class="contractIcon">{{contract.ext}}</div>-->
        <!--<div class="contractText">{{contract.name}}</div>-->
        <!--</div>-->
        <div class="contractImgWrapper" v-for="(item,index) in contractImgs"
             :style="{backgroundImage: 'url(' + item + ')'}">
          <img @click="deleteContractImg(index)" src="/static/Close@3x.png"/>
        </div>
        <input style="display: none" id="contractUpload" name="contractUpload" type="file" @change="uploadContract"/>
        <label for="contractUpload">
          <img class="addContract" src="./add@3x.png"/>
        </label>
      </div>
    </div>

    <div style="font-size: 16px;position: absolute;top: 100px;right:10px">
      <div class="tempBtn" @click="createContract">提交合同</div>
      <div class="tempBtn" @click="createAdditionalContract">提交附加合同</div>
      <div class="tempBtn" @click="checkData">查看数据</div>
    </div>

    <div class="signBlock" v-if="contractId">
      <div class="header">签署合同</div>
      <div class="signItemBlock">
        <div class="info">
          <div class="role">甲方</div>
          <div class="name">{{firstUserName}}</div>
          <div class="date">{{firstUserDate}}</div>
        </div>
        <div @click="editContract('original')" class="toConfirmBtn" v-if="isFirstPartyConfirmed">编辑合同</div>
        <div class="confirmedBtn" v-if="isFirstPartyConfirmed">已确认</div>
        <div @click="toConfirm(contractId)" class="toConfirmBtn" v-else>确认合同</div>
      </div>
      <div class="signItemBlock">
        <div class="info">
          <div class="role">乙方</div>
          <div class="name">{{secondUserName}}</div>
          <div class="date">{{secondUserDate}}</div>
        </div>
        <div class="confirmedBtn" v-if="isSecondPartyConfirmed">已确认</div>
        <div @click="toConfirm(contractId)" class="toConfirmBtn" v-else>确认合同</div>
      </div>
    </div>

    <div class="contractBlock" v-if="isFirstPartyConfirmed&&isSecondPartyConfirmed">
      <div class="header">附加合同</div>
      <div class="contractItemWrapper">
        <!--<div class="contractItem" v-if="contractAttach.isExist">-->
        <!--<div class="contractIcon">{{contractAttach.ext}}</div>-->
        <!--<div class="contractText">{{contractAttach.name}}</div>-->
        <!--</div>-->
        <div class="contractImgWrapper" v-for="(item,index) in additionalContractImgs"
             :style="{backgroundImage: 'url(' + item + ')'}">
          <img @click="deleteAdditionalContractImg(index)" src="/static/Close@3x.png"/>
        </div>
        <input style="display: none" id="additionalContractUpload" name="additionalContractUpload"
               type="file" @change="uploadAdditionalContract"/>
        <label for="additionalContractUpload">
          <img class="addContract" src="./add@3x.png"/>
        </label>
      </div>
    </div>

    <div class="signBlock" v-if="isFirstPartyConfirmed&&isSecondPartyConfirmed&&additionalContractId">
      <div class="header">签署合同</div>
      <div class="signItemBlock">
        <div class="info">
          <div class="role">甲方</div>
          <div class="name">{{firstUserName}}</div>
          <div class="date">{{firstUserDateAdditional}}</div>
        </div>
        <div @click="editContract('additional')" class="toConfirmBtn" v-if="isFirstPartyConfirmedAttach">编辑合同</div>
        <div class="confirmedBtn" v-if="isFirstPartyConfirmedAttach">已确认</div>
        <div @click="toConfirm(additionalContractId)" class="toConfirmBtn" v-else>确认合同</div>
      </div>
      <div class="signItemBlock">
        <div class="info">
          <div class="role">乙方</div>
          <div class="name">{{secondUserName}}</div>
          <div class="date">{{secondUserDateAdditional}}</div>
        </div>
        <div class="confirmedBtn" v-if="isSecondPartyConfirmedAttach">已确认</div>
        <div @click="toConfirm(additionalContractId)" class="toConfirmBtn" v-else>确认合同</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/v-header/v-header'
  import loading from '@/components/loading'
  import {uploadPhoto, formatDate} from '@/common/utils/utils.js'

  export default {
    name: 'contract',
    data() {
      return {
        isLoading: false,

        // 发起、查询合同相关
        contract: [], // 发送给后端的数据
        contractImgs: [], // 前端预览用
        contractId: '',// 发起合同成功后，后端返回的id
        additionalContract: [],
        additionalContractImgs: [],
        additionalContractId: '',
        price: '',// 合同金额

        // 甲乙方信息
        firstUserName: '未查询到',
        firstUserDate: '未查询到',
        secondUserName: '未查询到',
        secondUserDate: '未查询到',

        // 附加合同甲乙方信息
        firstUserDateAdditional: '未查询到',
        secondUserDateAdditional: '未查询到',

        // 合同确认相关
        isFirstPartyConfirmed: false,// 甲方确认
        isSecondPartyConfirmed: false,// 乙方确认
        isFirstPartyConfirmedAttach: false,// 附加合同甲方确认
        isSecondPartyConfirmedAttach: false,// 附加合同乙方确认

      }
    },
    computed: {
      token() {
        return sessionStorage.getItem('token')
      },
      globalDOMAIN() {
        return this.$store.state.globalDOMAIN
      },
      bidId() {
        for (let bid of this.taskInfo.bids) {
          if (bid.status == 99) {
            return bid.id
          }
        }
      },
    },
    created() {
      this.taskId = this.$route.params.taskId
      this.init()
    },
    methods: {
      checkData() {
        console.log(this.contract)
        console.log(this.additionalContract)
      },

      init() {
        this.getTaskDetail()
      },// 初始化页面，获取任务信息 --> 如果存在contract_id --> 获取合同信息 --> 展示合同图片，确认情况等

      getTaskDetail() {
        let id = this.taskId
        this.$http.get(`${this.globalDOMAIN}Employ/Task/getById`, {
          params: {'task_id': id},
          emulateJSON: true,
          headers: {'token': this.token}
        }).then((response) => {
          if (response.body.status) {
            let data = response.body.data
            this.taskInfo = data // 将获取的data存入taskInfo
            console.log(this.taskInfo)
            this.processTaskInfoData(this.taskInfo) // 处理taskInfo的信息
          } else {
            this.$vux.toast.text('获取任务失败')
          }
        })
      },// 发送请求获取任务数据

      processTaskInfoData(taskInfo) {
        if (taskInfo.contract.id) {
          let contract = taskInfo.contract
          this.contractId = contract.id

          // 甲乙方信息
          this.firstUserName = contract.first_user.username
          let firstUserTime = new Date(contract.inputtime * 1000)
          this.firstUserDate = formatDate(firstUserTime, 'yyyy年MM月dd日')
          this.secondUserName = contract.second_user.username
          if (contract.handle_time) {
            let secondUserTime = new Date(contract.handle_time * 1000)
            this.secondUserDate = formatDate(secondUserTime, 'yyyy年MM月dd日')
          } else {
            this.secondUserDate = ''
          }
          this.price = `￥${contract.money}`

          // 合同图片
          for (let url of contract.contract) {
            this.contract.push(url)
            this.contractImgs.push(`${this.globalDOMAIN.slice(0, -11)}${url}`)
          }


          // 确认情况
          if (contract.status == 1) {
            this.isFirstPartyConfirmed = true
          } else if (contract.status == 99) {
            this.isFirstPartyConfirmed = true
            this.isSecondPartyConfirmed = true
          } else {
            this.$vux.toast.text('已作废')
          }
        }

        // 附加合同
        if (taskInfo.additional_contract.id) {


          let addContract = taskInfo.additional_contract
          this.additionalContractId = addContract.id


          // 甲乙方信息
          let firstUserTime = new Date(addContract.inputtime * 1000)
          this.firstUserDateAdditional = formatDate(firstUserTime, 'yyyy年MM月dd日')
          if (addContract.handle_time) {
            let secondUserTimeAdditional = new Date(addContract.handle_time * 1000)
            this.secondUserDateAdditional = formatDate(secondUserTimeAdditional, 'yyyy年MM月dd日')
          } else {
            this.secondUserDateAdditional = ''
          }

          // 合同图片
          for (let url of addContract.contract) {
            this.additionalContract.push(url)
            this.additionalContractImgs.push(`${this.globalDOMAIN.slice(0, -11)}${url}`)
          }

          // 确认情况
          if (addContract.status == 1) {
            this.isFirstPartyConfirmedAttach = true
          } else if (addContract.status == 99) {
            this.isFirstPartyConfirmedAttach = true
            this.isSecondPartyConfirmedAttach = true
          } else {
            this.$vux.toast.text('已作废')
          }
        }
      },// 处理获取到的任务信息

      getContract(contractId) {
        if (contractId) {
          this.$http.get(`${this.globalDOMAIN}Employ/Task/getContract`, {
            params: {'contract_id': contractId},
            emulateJSON: true,
            headers: {'token': this.token}
          }).then((res) => {
            let body = res.body
            if (body.status) {
//              this.$vux.toast.text(body.msg)
              // this.getTaskDetail()
              if (body.data.status == 1) {
                this.isFirstPartyConfirmed = true
              } else if (body.data.status == 99) {
                this.isFirstPartyConfirmed = true
                this.isSecondPartyConfirmed = true
              } else {
                this.$vux.toast.text('已作废')
              }
            } else {
              this.$vux.toast.text(body.msg)
            }
          })
        } else {
          this.$vux.toast.text('暂无合同')
        }
      },// 获取合同

      getAddtionalContract(contractId) {
        if (contractId) {
          this.$http.get(`${this.globalDOMAIN}Employ/Task/getContract`, {
            params: {'contract_id': contractId},
            emulateJSON: true,
            headers: {'token': this.token}
          }).then((res) => {
            let body = res.body
            if (body.status) {
//              this.$vux.toast.text(body.msg)
              if (body.data.status == 1) {
                this.isFirstPartyConfirmedAttach = true
              } else if (body.data.status == 99) {
                this.isFirstPartyConfirmedAttach = true
                this.isSecondPartyConfirmedAttach = true
              } else {
                this.$vux.toast.text('已作废')
              }
            } else {
              this.$vux.toast.text(body.msg)
            }
          })
        } else {
          this.$vux.toast.text('暂无合同')
        }
      },// 获取附加合同

      uploadContract(e) {
        let file = e.target.files[0]
        uploadPhoto.call(this, file, `${this.globalDOMAIN}Api/File/picUploader`, this.token, this.contractImgs, this.contract)
      },// 上传合同图片

      uploadAdditionalContract(e) {
        let file = e.target.files[0]
        uploadPhoto.call(this, file, `${this.globalDOMAIN}Api/File/picUploader`, this.token, this.additionalContractImgs, this.additionalContract)
      },// 上传附加合同图片

      createContract() {
        if (this.contract) {
          this.$http.post(`${this.globalDOMAIN}Employ/Task/contract`, {
            'task_id': this.taskId,
            'bid_id': this.bidId,
            'contract': this.contract,
            'money': this.price.slice(1),
          }, {
            emulateJSON: true,
            headers: {'token': this.token}
          }).then((res) => {
            let body = res.body
            if (body.status) {
              this.contractId = body.data.contract_id
              this.$vux.toast.text(body.msg)
//              this.getTaskDetail()
              this.getContract(this.contractId)
            } else {
              this.$vux.toast.text(body.msg)
            }
          })
        } else {
          this.$vux.toast.text('请先上传合同图片')
        }

      },// 发起合同

      createAdditionalContract() {
        if (this.additionalContract) {
          this.$http.post(`${this.globalDOMAIN}Employ/Task/additionalContract`, {
            'task_id': this.taskId,
            'bid_id': this.bidId,
            'contract': this.additionalContract
          }, {
            emulateJSON: true,
            headers: {'token': this.token}
          }).then((res) => {
            let body = res.body
            if (body.status) {
              this.additionalContractId = body.data.contract_id
              this.$vux.toast.text(body.msg)
//              this.getTaskDetail()
              this.getAddtionalContract(this.additionalContractId)
            } else {
              this.$vux.toast.text(body.msg)
            }
          })
        } else {
          this.$vux.toast.text('请先上传合同图片')
        }
      },// 发起附加合同

      deleteContractImg(index) {
        this.contract.splice(index, 1)
        this.contractImgs.splice(index, 1)
      },// 删除已有合同图片

      deleteAdditionalContractImg(index) {
        this.additionalContract.splice(index, 1)
        this.additionalContractImgs.splice(index, 1)
      },// 删除已有附加合同图片

      toConfirm(contractId) {
        this.$http.post(`${this.globalDOMAIN}Employ/Task/acceptContract`, {
          'contract_id': contractId
        }, {
          emulateJSON: true,
          headers: {'token': this.token}
        }).then((res) => {
          if (res.body.status) {
            this.$vux.toast.text(res.body.msg)
            this.getContract(contractId)
          } else {
            this.$vux.toast.text(res.body.msg)
          }
        })
      },// 确认合同

      editContract(type) {
        // type--是主合同还是附加合同，original 或者 additional
        if (type == 'original') {
          console.log(this.contract)
          let url = `${this.globalDOMAIN}Employ/Task/editContract`
          let data = {
            'task_id': this.taskId,
            'bid_id': this.bidId,
            'contract': this.contract,
            'money': this.price.slice(1),
          }
          this.$http.post(url, data, {
            emulateJSON: true,
            headers: {'token': this.token}
          }).then((res) => {
            if (res.body.status) {
              this.$vux.toast.text(res.body.msg)
            } else {
              this.$vux.toast.text(res.body.msg)
            }
          })
        } else {
          console.log(this.additionalContract)
          let url = `${this.globalDOMAIN}Employ/Task/editAdditionalContract`
          let data = {
            'task_id': this.taskId,
            'bid_id': this.bidId,
            'contract': this.additionalContract,
          }
          this.$http.post(url, data, {
            emulateJSON: true,
            headers: {'token': this.token}
          }).then((res) => {
            if (res.body.status) {
              this.$vux.toast.text(res.body.msg)
            } else {
              this.$vux.toast.text(res.body.msg)
            }
          })
        }

      },// 编辑合同

    },
    components: {
      loading,
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/style/fun.styl"
  .contractWrapper
    display: flex
    flex-direction: column
    min-height: 100vh
    background-color: #f8f8f8
    .tempBtn // 临时按钮
      display: flex
      flex-direction: row
      align-items: center
      justify-content: center
      font-size: px2-2-rem(30)
      width: px2-2-rem(200)
      height: px2-2-rem(50)
      border-radius: px2-2-rem(8)
      color: #00a0e9
      border: 1px solid #00a0e9
      margin-bottom: px2-2-rem(20)
    .priceBlock
      box-sizing: border-box
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      height: px2-2-rem(90)
      padding: 0 px2-2-rem(30)
      margin-bottom: px2-2-rem(20)
      border-top: 1px solid #e9e9e9
      font-size: px2-2-rem(32)
      background-color: #ffffff
      .price
        display: flex
        flex-direction: row
        align-items: center
        width: px2-2-rem(300)
        text-align: right
        color: #e4790f
        input
          width: px2-2-rem(280)
    .contractBlock, .signBlock
      display: flex
      flex-direction: column
      font-size: px2-2-rem(32)
      padding-left: px2-2-rem(30)
      margin-bottom: px2-2-rem(20)
      border-top: 1px solid #e9e9e9
      background-color: #ffffff
      .header
        height: px2-2-rem(90)
        line-height: px2-2-rem(90)
        border-bottom: 1px solid #e5e5e5
      .contractItemWrapper
        display: flex
        flex-direction: row
        flex-wrap: wrap
        align-content: center
        padding-top: px2-2-rem(30)
        padding-bottom: px2-2-rem(60)
        .contractItem
          display: flex
          flex-direction: column
          align-items: center
          justify-content: center
          height: px2-2-rem(144)
          margin-right: px2-2-rem(20)
          .contractIcon
            width: px2-2-rem(144)
            height: px2-2-rem(88)
            line-height: px2-2-rem(88)
            text-align: center
            background-color: #00a0e9
            color: #ffffff
            border-radius: px2-2-rem(8)
          .contractText
            margin-top: px2-2-rem(10)
            font-size: px2-2-rem(26)
            color: #888888
        .addContract
          height: px2-2-rem(142)
          width: px2-2-rem(142)
      .contractImgWrapper
        position: relative
        width: px2-2-rem(142)
        height: px2-2-rem(142)
        margin-right: px2-2-rem(30)
        background-size: cover
        img
          position: absolute
          top: px2-2-rem(-10)
          right: px2-2-rem(-10)
          width: px2-2-rem(40)
          height: px2-2-rem(40)
      .signItemBlock
        box-sizing: border-box
        display: flex
        flex-direction: row
        align-items: center
        justify-content: space-between
        padding-right: px2-2-rem(36)
        height: px2-2-rem(168)
        border-bottom: 1px solid #e5e5e5
        .role
          font-size: px2-2-rem(30)
          color: #999999
        .name
          font-size: px2-2-rem(32)
        .date
          font-size: px2-2-rem(26)
          color: #999999
        .confirmedBtn, .toConfirmBtn
          display: flex
          flex-direction: row
          align-items: center
          justify-content: center
          font-size: px2-2-rem(30)
          width: px2-2-rem(162)
          height: px2-2-rem(50)
          border-radius: px2-2-rem(8)
        .confirmedBtn
          color: #555555
          border: 1px solid #555555
        .toConfirmBtn
          color: #00a0e9
          border: 1px solid #00a0e9
      .signItemBlock:last-child
        border: none
</style>
