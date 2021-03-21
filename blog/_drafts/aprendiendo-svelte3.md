---
layout: post
title: Aprendiendo Svelte3
---

DOM event handlers can have modifiers that alter their behaviour. For example, a handler with a once modifier will only run a single time:

```html
<script>
	function handleClick() {
		alert('clicked')
	}
</script>

<button on:click={handleClick}>
	Click me
</button>
```


