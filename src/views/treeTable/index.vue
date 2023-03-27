<template>
  <div class="tree">
    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="getTreeRadioEvent">获取选中</vxe-button>
        <vxe-button @click="getCurrentEvent">获取选中行</vxe-button>
        <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
        <vxe-button @click="handleOpenAll">展开所有</vxe-button>
        <vxe-button @click="handleCloseAll">关闭所有</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      show-overflow
      ref="xTree"
      :show-header="false"
      :tree-config="{
        transform: true,
        rowField: 'uid',
        parentField: 'parentId',
        lazy: true,
        hasChild: 'hasChildren',
        loadMethod: loadChildrenMethod,
        toggleMethod: toggleMethods,
      }"
      :row-config="{ isCurrent: true, isHover: true, keyField: 'uid' }"
      :data="demo.tableData"
      @cell-dblclick="cellDBLClickEvent"
      @cell-click="cellClickEvent"
    >
      >
      <!-- <vxe-column type="radio" tree-node></vxe-column> -->
      <vxe-column field="name" title="Name" tree-node></vxe-column>
      <vxe-column title="操作" width="140" show-overflow>
        <template #default="{ row }">
          <vxe-button type="text" icon="vxe-icon-add" @click="addEvent(row)"></vxe-button>
          <vxe-button type="text" icon="vxe-icon-edit" @click="editEvent(row)"></vxe-button>
          <vxe-button type="text" icon="vxe-icon-delete" @click="removeEvent(row)"></vxe-button>
        </template>
      </vxe-column>
    </vxe-table>
    <!-- <div>{{ demo.tableData }}</div> -->
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, onMounted } from 'vue';
  import XEUtils from 'xe-utils';
  import { VxeTableInstance, VxeTableEvents } from 'vxe-table';
  // import { tableData } from './config';
  import { useHomeStore } from '/@/store/modules/home';
  const homeStore = useHomeStore();
  onMounted(() => {
    getHomeData({ parentId: '', name: '' });
  });
  const demo = reactive({
    tableData: [],
  });
  // 获取数据
  const getHomeData = ({ parentId, name }) => {
    let data = { parentId, name, sortColumn: 'name', sortType: 0 };
    homeStore.xGetHomeTree(data).then((res) => {
      demo.tableData = res.data;
    });
  };
  const xTree = ref<VxeTableInstance>();
  // 获取选中的节点
  const getTreeRadioEvent = () => {
    const $table = xTree.value;
    const selectRow = $table!.getRadioRecord();
    console.log('选中的节点', selectRow);
  };
  // 获取选中行
  const getCurrentEvent = () => {
    const $table = xTree.value;
    const selectRow = $table!.getCurrentRecord();
    console.log('选中的行', selectRow);
  };
  // 获取展开的节点
  const getTreeExpansionEvent = () => {
    const $table = xTree.value;
    const treeExpandRecords = $table!.getTreeExpandRecords();
    console.log('展开的节点', treeExpandRecords);
  };
  // 展开所有
  const handleOpenAll = () => {
    const $table = xTree.value;
    $table!.setAllTreeExpand(true);
  };
  // 关闭所有
  const handleCloseAll = () => {
    const $table = xTree.value;
    $table!.clearTreeExpand();
  };
  // 双击行
  const cellDBLClickEvent: VxeTableEvents.CellDblclick = ({ row }) => {
    console.log('双击行', row);
  };
  // 单击行
  const cellClickEvent: VxeTableEvents.CellClick = ({ row, column }) => {
    console.log('单击行', row, column, row.uid);
    // const $table = xTree.value;
    // let parentRow = $table!.getRowById(row.parentId);
    // console.log('父节点', parentRow);
  };
  // 添加行
  const addEvent = async (currRow: any) => {
    console.log('添加行', currRow);
    const $table = xTree.value;
    const record = {
      name: `新数据${XEUtils.uniqueId()}`,
      uid: XEUtils.uniqueId(),
      parentId: currRow.uid, // 需要指定父节点，自动插入该节点中
    };
    const { row: newRow } = await $table!.insert(record);
    await $table!.setTreeExpand(currRow, true); // 将父节点展开
    await $table!.setEditRow(newRow); // 插入子节点
  };
  // 删除行
  const removeEvent = (row: any) => {
    const $table = xTree.value;
    $table!.remove(row);
    // 当父节点没子级的时候 去除小三角
    // let parentRow = $table!.getRowById(row.parentId);
    // const record = {...parentRow};
    // if (parentRow.children.length === 0) {
    //   record.hasChildren = false;
    // }
    // $table!.reloadRow(parentRow, record || {}).then(() => {
    //   XEUtils.assign(parentRow, record || {});
    // });
    // 重载父节点
    // $table!.clearTreeExpandLoaded(parentRow).then(() => {
    //   $table!.reloadTreeExpand(parentRow);
    //   $table!.setTreeExpand(parentRow, true);
    // });
  };
  // 编辑行
  const editEvent = async (currRow: any) => {
    console.log('编辑行', currRow);
    const $table = xTree.value;
    const record = {
      name: `新数据123`,
      uid: currRow.uid,
      parentId: currRow.parentId, // 需要指定父节点，自动插入该节点中
    };
    await $table!.reloadRow(currRow, record || {}).then(() => {
      XEUtils.assign(currRow, record || {});
    });
  };
  // 异步加载展开后的内容
  const loadChildrenMethod = ({ row }: any) => {
    console.log('异步加载展开后的内容', row);
    let temp = { parentId: row.uid, name: row.name, sortColumn: 'name', sortType: 0 };
    return new Promise((resolve) => {
      homeStore.xGetHomeTree(temp).then((res) => {
        resolve(res.data);
      });
    });
  };
  // 展开关闭时触发
  const toggleMethods = ({ expanded, row }) => {
    // console.log(expanded, row);
    const $table = xTree.value;
    if (!expanded) {
      //关闭时 去除已加载状态
      $table!.clearTreeExpandLoaded(row);
    }
    return true;
  };
  // 获取父节点
  // const getParentRow = ({ row }) => {
  //   // const $table = xTree.value;
  //   // const parentRow = $table!.getParentRow(row);
  //   console.log('获取父节点', row);
  // };
</script>

<style scoped lang="less">
  .tree {
    width: 50%;
    margin: 0 auto;
  }
</style>
