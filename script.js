window.onload = function(){
    const params = new URLSearchParams(window.location.search);
    const token = "IGAAUWrsy2hzdBZAE9nWjUxdGJ2RU5jN18tZAlVDR0xiRlhEQUR6SE1jZAUV1aVJpX1JrVHFWQzRCX0R3RVFDM1VDLWgxdURnN2ZAQd1p2dEhORlpINjJwQXFsWU5GRy11NEg2ZAGVzTjRlOGhpSGNkWEJLOXZAB";
    const userId = '24489596603965371#_'
  
    if (token && userId) {
      // Set hidden form values
      document.getElementById('insta_token').value = token;
      document.getElementById('insta_user_id').value = userId;
  
      // Switch UI to connected mode
      document.querySelector('input[value="connect"]').checked = true;
      document.querySelector('input[name="ig_mode"]').dispatchEvent(new Event('change'));
  
      // Call backend to get metrics
      fetch(`https://780a3133a9bf.ngrok-free.app/api/instagram/metrics?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        document.getElementById('ig_followers').value = data.followers;
        document.getElementById('ig_views').value = data.monthlyViews;
      })
      .catch(err => {
        console.error(err);
        alert('Could not fetch Instagram data — enter manually');
      });
  
      // Clean up URL to avoid leaking token
      history.replaceState({}, '', location.pathname);
    }
  }