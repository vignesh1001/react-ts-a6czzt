/*const handleUserTopicSettingsSubmit = () => event => {
    let Obj = userTopicSettings[selectedTopicType];
    if (Obj.validation && Obj.value == '') {
      Obj['isError'] = true;
    } else {
      Obj['isError'] = false;
    }
    setUserTopicSettings({ ...userTopicSettings, [selectedTopicType]: Obj });
    if (Obj['isError']) {
      return;
    }
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/addTopic`,
        {
          name: Obj.value,
          sort_order: 0,
          topicType: selectedTopicType === 'tableTopic' ? 'table' : undefined
        },
        {
          headers: { Authorization: `Bearer ${props.token}` }
        }
      )
      .then(
        response => {
          loadTopics(selectedTopicType);
          NotificationManager.success('New Topics Added Successfully');
          Obj['value'] = '';
          setUserTopicSettings({
            ...userTopicSettings,
            [selectedTopicType]: Obj
          });
        },
        errorResponse => {
          NotificationManager.error(
            'Error in Saving New Topics ' + errorResponse.response.data.error ||
              errorResponse.response.data.remarks
          );
        }
      );
    // let userSettingsTopicArr = userTopicSettings['userSettingsTopicArr'];
    // if (topic.value != '') {
    //     let myObj = {};
    //     myObj.name = topic.value;
    //     myObj.sortOrder = 0;
    //     myObj.action = '<Filter/Edit/Delete button>';
    //     userSettingsTopicArr.value.push(myObj);
    //     topic.value = '';
    // }
    // setUserTopicSettings({
    //     ...userTopicSettings,
    //     ['userSettingsTopicArr']: userSettingsTopicArr,
    //     ['topic']: topic
    // });
    console.log(userTopicSettings);
  };*/

  /* Update topics */
  /*const handleChangeEditTopic = prop => event => {
    let Obj = editTopic[prop];
    if (event.target.type === 'checkbox') {
      Obj['value'] = event.target.checked;
    } else {
      Obj['value'] = event.target.value;
    }
    setEditTopic({ ...editTopic, [prop]: Obj });
  };*/
  /*const handleTopicUpdateSubmit = () => {
    if (!editTopic.name.value) {
      editTopic.name.isError = true;
      return;
    }
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/updateTopics`,
        { topicID: selectedTopics.id, name: editTopic.name.value },
        {
          headers: { Authorization: `Bearer ${props.token}` }
        }
      )
      .then(
        response => {
          setOpen(false);
          loadTopics(selectedTopicType);
          NotificationManager.success('Updated Successfully');
        },
        errorResponse => {
          NotificationManager.error(
            'Error in Updating Topics ' + errorResponse.response.data.error ||
              errorResponse.response.data.remarks
          );
        }
      );
  };*/
  /*const handleClickUpdateOpen = prop => {
    setOpen(true);
    let ObjName = editTopic['name'];
    let ObjSortOrder = editTopic['sortOrder'];
    ObjName.value = prop.name;
    ObjSortOrder.value = prop.sort_order;
    setEditTopic({
      ...editTopic,
      ['name']: ObjName,
      ['sortOrder']: ObjSortOrder
    });
    setSelectedTopics(prop);
  };*/
  /*const handleClose = () => {
    setOpen(false);
  };*/
  /* Delete */
  /*const handleClickOpenTopicDelete = prop => {
    setOpenTopicDelete(true);
    console.log(prop);
    setSelectedTopics(prop);
  };*/
  const handleCloseTopicDelete = () => {
    setOpenTopicDelete(false);
  };
  const handleTopicDeleteSubmit = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/adminDeleteTopics`,
        { tagID: selectedTopics.id, userID: props.acccount.id },
        {
          headers: { Authorization: `Bearer ${props.token}` }
        }
      )
      .then(
        response => {
          loadTopics(selectedTopicType);
          setOpenTopicDelete(false);
          NotificationManager.success('Deleted Successfully');
        },
        errorResponse => {
          NotificationManager.error(
            'Error in Deleting Topics ' + errorResponse.response.data.error ||
              errorResponse.response.data.remarks
          );
        }
      );
    setOpenTopicDelete(false);
    setSelectedTopics(null);
  };