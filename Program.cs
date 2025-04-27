using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Serve index.html from wwwroot when root URL is accessed
app.UseDefaultFiles();

// Enable static file serving (HTML, CSS, JS, JSON)
app.UseStaticFiles();

// API endpoint to save new post to both feeds
app.MapPost("/api/PostToFeeds", async (HttpContext context) =>
{
    using var reader = new StreamReader(context.Request.Body);
    var body = await reader.ReadToEndAsync();
    var newPost = JsonSerializer.Deserialize<Post>(body);

    if (newPost is not null)
    {
        newPost.createdAt = DateTime.UtcNow;

        var xFile = Path.Combine("wwwroot", "data", "xtwitter_posts.json");
        var tFile = Path.Combine("wwwroot", "data", "threads_posts.json");

        // Initialize lists if the files do not exist
        var xPosts = File.Exists(xFile)
            ? JsonSerializer.Deserialize<List<Post>>(await File.ReadAllTextAsync(xFile)) ?? new List<Post>()
            : new List<Post>();

        var tPosts = File.Exists(tFile)
            ? JsonSerializer.Deserialize<List<Post>>(await File.ReadAllTextAsync(tFile)) ?? new List<Post>()
            : new List<Post>();

        // Insert the new post at the top of both feeds
        xPosts.Insert(0, newPost);
        tPosts.Insert(0, newPost);

        // Write updated posts back to the respective JSON files
        await File.WriteAllTextAsync(xFile, JsonSerializer.Serialize(xPosts, new JsonSerializerOptions { WriteIndented = true }));
        await File.WriteAllTextAsync(tFile, JsonSerializer.Serialize(tPosts, new JsonSerializerOptions { WriteIndented = true }));

        // Return the newly added post as a confirmation
        return Results.Ok(newPost);
    }

    return Results.BadRequest("Invalid post data.");
});

// Run the app
app.Run();

// Define Post record type
record Post
{
    public string username { get; set; }
    public string content { get; set; }
    public DateTime createdAt { get; set; }
}
