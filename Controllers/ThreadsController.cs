using Microsoft.AspNetCore.Mvc;
using StaticSite.Models;

[Route("api/[controller]")]
[ApiController]
public class ThreadsController : ControllerBase
{
    private static List<ThreadPost> _posts = new List<ThreadPost>();

    // GET: api/Threads
    [HttpGet]
    public IEnumerable<ThreadPost> Get()
    {
        return _posts;
    }

    // POST: api/Threads
    [HttpPost]
    public ActionResult<ThreadPost> Post([FromBody] ThreadPost post)
    {
        post.CreatedAt = DateTime.UtcNow;
        _posts.Add(post);
        return CreatedAtAction(nameof(Get), new { id = post.Id }, post);
    }
}

        return CreatedAtAction(nameof(Get), new { id = post.Id }, post);
    }
}
>>>>>>> 5f85b853791a9fa436df4ac7a04582cd2b4408d1
