function makeFriendsList(friends) {
 let ul = document.createElement('ul');

  friends.forEach((friend) => {
    ul.innerHTML += `<li>${friend.firstName} ${friend.lastName}</li>`;
  });
  return ul;
}
