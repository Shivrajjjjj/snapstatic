using Microsoft.AspNetCore.Mvc;
using StaticSite.Models;

[Route("api/[controller]")]
[ApiController]
public class XFeedController : ControllerBase
{
    private static List<XFeedPost> _posts = new List<XFeedPost>();

    // GET: api/XFeed
    [HttpGet]
    public IEnumerable<XFeedPost> Get()
    {
        return _posts;
    }

    // POST: api/XFeed
    [HttpPost]
    public ActionResult<XFeedPost> Post([FromBody] XFeedPost post)
    {
        post.CreatedAt = DateTime.UtcNow;
        _posts.Add(post);
        return CreatedAtAction(nameof(Get), new { id = post.Id }, post);
    }
}
