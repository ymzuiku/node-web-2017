// 定制化合成
// 基因合成
// •	技术特色
// •	业务介绍
// •	订购指南
// Oligo合成
// •	合成简介
// •	修饰种类
// •	订购指南
// •	常见问题

let React =require('react')

let jishuteshe = <div>
  <p>我们为您提供各种全基因合成服务，包括合成密码子优化过的cDNA、特殊位点突变的基因、人工设计的DNA序列，以及您感兴趣的任何基因。客户仅需提供核苷酸或氨基酸序列，我们承诺将在最短的时间内交付包含您所需目的基因的理想质粒。</p>
  <h2>技术优势</h2>
  <ul>
    <li>自主知识产权的基因组设计和染色体化切分设计软件，可实现大片段优化组装和人工染色体快速构建</li>
    <li>提供从几十bp至1M的基因及基因组合成服务。基于酵母染色体合成经验，建立一步法DNA大片段组装流程，一次组装长度可达~20kb;</li>
    <li>提供基于芯片的oligopool合成及高通量基因合成', '对高GC、低GC以及重复序列采用独特的解决方案，有效合成难度基因。</li>
  </ul>
  <h2>服务特色</h2>
  <ul>
    <li>免费提供基因参考设计方案，包括酶切位点设计、密码子优化等</li>
    <li>基因合成周期短，将严格执行与客户签订的基因合成服务协议和保密合同</li>
    <li>基因克隆到通用载体或用户指定/提供的表达载体上，提供免费载体库</li>
    <li>提供 DNA 测序结果，保证所合成的基因序列100%准确</li>
  </ul>
</div>

let yewujieshao = <div>
  <h2>服务流程</h2>
  <img src="./pic2/a1.png" alt="" />
  <h2>产品类型</h2>
  <ul>
    <li>基因合成</li>
    <li>定点突变</li>
    <li>PCR克隆</li>
    <li>Oligo pool合成</li>
    <li>高通量基因合成</li>
  </ul>
  <h2>合成周期</h2>
  <img src="./pic2/a2.png" alt="" />
  <p>注:</p>
  <ul>
    <li>上述周期为普通基因合成，若为难度基因则合成周期会相应延长。</li>
    <li>大批量订单更可享受更具竞争力的发货周期，满足您的实验所需。</li>
  </ul>
  <h3>完成指标</h3>
  <p>测序验证序列正确，符合订单要求</p>
  <h3>产品交付</h3>
  <ul>
    <li>冻干质粒DNA一管（2-5μg/管）','含阳性质粒的菌株一份</li>
    <li>基因合成报告单（电子版）</li>
    <li>测序峰图&质粒图谱</li>    
    <li>全基因合成服务产品说明书</li>
  </ul>
</div>

let dinggouzhinan = <div>
  <h2>订购方法</h2>
  <ul>
    <li>下载基因合成订单模板（插入链接）</li>
    <li>填写订单后，将订单发送至syn-serice@genomics.cn邮箱进行评估，我们在收到您邮件后4小时内回复评估结果，结果包括合成周期及合成价格。</li>
    <li>在您回复确认邮件后，开始下单合成</li>
  </ul>
  <h2>需要客户提供的信息</h2>
  <h3>基因合成</h3>
  <ul>
    <li>基因序列或蛋白序列并告知对应序列优化物种</li>
    <li>如对酶切位点及克隆载体的特殊要求，需单独说明</li>
  </ul>
  <h3>PCR克隆</h3>
  <ul>
    <li>基因序列</li>
    <li>基因所在载体信息</li>
    <li>基因预计克隆的目标载体信息以及克隆位置</li>
    <li>模板基因的测序峰图</li>
    <li>质粒样品2-5ug，即100ng/ul浓度，最少提供20ul（干粉最佳）</li>
  </ul>
  <h3>点突变</h3>
  <ul>
    <li>基因突变前后的序列</li>
    <li>基因所在载体信息以及具体位置</li>
    <li>突变前序列的测序峰图</li>
    <li>质粒样品2-5ug，即100ng/ul浓度，最少提供20ul（干粉最佳）</li>
  </ul>
  <h2>温馨提示</h2>
  <p>长度&lt;300bp的基因按照每条收取费用，长度≥300bp的基因按碱基收费（包括两端酶切位点部分）</p>
  <p>合成的基因免费克隆到通用载体中（pUC系列载体）。当需要克隆至其它载体时，会首先在免费载体库中查找，非库中载体，则会因生产需摸索条件，而酌情收取一定费用。</p>
  <p>如使用您的载体，则需在合成前提供载体及其准确序列，经我方验证合格方可使用。若验证序列有误，则会收取一定检测费用，并通知客户重新提供。</p>
  <p>报价均为基础报价，难度增加时，价格也会酌情调整。</p>
  <p>有任何其他需求，请您在发送评估序列时说明，以便我们更好的为您服务。</p>
  <ul>
    <li>冻干质粒DNA一管（2-5μg/管）</li>
    <li>含阳性质粒的菌株一份</li>
    <li>基因合成报告单（电子版）</li>
    <li>测序峰图&质粒图谱</li>
    <li>全基因合成服务产品说明书</li>
  </ul>
</div>

let hechengjianjie = <div></div>

let xiushizhonglei = <div></div>

let dinggouzhinan2 = <div></div>

let changjianwenti = <div></div>

let serves = [
  {
    title: '定制化合成', data: [
      {
        title: '基因合成', data: [
          { title: '技术特色', info: jishuteshe },
          { title: '业务介绍', info: yewujieshao },
          { title: '订购指南', info: dinggouzhinan },
        ]
      },
      {
        title: 'Oligo合成', data: [
          { title: '合成简介', info: hechengjianjie },
          { title: '修饰种类', info: xiushizhonglei },
          { title: '订购指南', info: dinggouzhinan2 },
          { title: '常见问题', info: changjianwenti },
        ]
      },
    ]
  },
  {
    title: 'test', data: [
      { tip:'测试title'},
      {
        title: '基因合成', data: [
          { title: '技术特色', info: jishuteshe },
          { title: '业务介绍', info: yewujieshao },
          { title: '订购指南', info: dinggouzhinan },
        ]
      },
      {
        title: 'Oligo合成', data: [
          { title: '合成简介', info: hechengjianjie },
          { title: '修饰种类', info: xiushizhonglei },
          { title: '订购指南', info: dinggouzhinan2 },
          { title: '常见问题', info: changjianwenti },
        ]
      },
    ]
  }
]

module.exports = serves