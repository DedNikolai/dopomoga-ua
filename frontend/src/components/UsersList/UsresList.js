import React, {memo} from "react";
import UserItem from '../UserItem/UserItem';

function UsersList({users}) {
    console.log('list render')
    return users.map((row) => <UserItem user={row} key={row.id} />)
};

export default memo(UsersList);