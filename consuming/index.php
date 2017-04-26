<?php $stories = json_decode(file_get_contents('http://localhost:3000/api/stories?entities=true')); ?>

<?php if ($stories): ?>
	<?php foreach($stories->data as $story): ?>
		<custom-card class="w-100">
			<custom-card-header flush>
				<h2><?php echo $story->owner->username; ?></h2>
				<custom-avatar org size="tiny" name="<?php echo $story->owner->first_name . " " . $story->owner->last_name; ?>" color="<?php echo $story->owner->color; ?>"></custom-avatar>
			</custom-card-header>
			<custom-card-body>
				<copy-wrap>
					<h2><?php echo $story->content; ?></h2>
				</copy-wrap>
			</custom-card-body>
		</custom-card>
	<?php endforeach; ?>
<?php else: ?>
	<custom-callout priority="error" striped class="w-100">
		<copy-wrap invert>
			<h2>Oh no!!</h2>
			<p>Looks like the API is currently down... bummer!</p>
		</copy-wrap>
	</custom-callout>
<?php endif; ?>
