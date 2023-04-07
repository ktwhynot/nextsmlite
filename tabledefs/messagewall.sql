create view messagewall as
  select
    "Posts".id,
    "Posts".created_at,
    "Posts".content,
    profiles.avatar_url,
    profiles.username
  from "Posts" left join profiles on "Posts".author = profiles.id
  order by "Posts".created_at desc
  limit 20