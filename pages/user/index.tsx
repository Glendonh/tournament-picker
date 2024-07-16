const user = {
  name: 'GlendonH',
  groups: [{ name: 'Cageside Seats' }, { name: 'SquaredCircle' }, { name: 'POST Wrestling' }],
}

const UserPage = () => {
  return (
    <div className="container mx-3">
      <h1 className="text-xl text-center mt-12">{`Welcome ${user.name}`}</h1>
      <div className="flex flex-row space-x-3">
        <div className="border rounded-md px-3 py-1">
          <p className="text-lg">Groups</p>
          <hr />
          {user.groups.map((group) => (
            <p key={group.name}>{group.name}</p>
          ))}
        </div>
        <div className="border rounded-md px-3 py-1">
          <p className="text-lg">Tournaments</p>
          <hr />
          <p className="text-sm">In Progress</p>
          <p>G1 Climax 34</p>
          <p className="text-sm">Recent</p>
          <p>G1 Climax 33</p>
        </div>
        <div className="border rounded-md px-3 py-1">
          <p className="text-lg">Profile</p>
          <hr />
          <p>Edit</p>
        </div>
      </div>
    </div>
  )
}

export default UserPage
