exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ideas').del()
    .then(function () {
      // Inserts seed entries
      return knex('ideas').insert([
        {id: 1, title: 'Dude', body: 'where\s my car?'},
        {id: 2, title: 'sweet', body: 'it\s on the lawn'}
      ]);
    });
};
