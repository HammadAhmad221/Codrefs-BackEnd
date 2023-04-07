const express = require('express');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const listFiles = require('isomorphic-git');
const http = require('isomorphic-git/http/node');

const app = express();
const port = 3000;

app.get('/:platform/:username/:repositoryName', async (req, res) => {
  const { platform, username, repositoryName } = req.params;

  let repositoryUrl;
  let auth = {};

  if (platform === 'github') {
    repositoryUrl = `https://github.com/${username}/${repositoryName}.git`;
    auth = {
      username: 'HammadAhmad221',
      password: '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',
    };
  } else if (platform === 'bitbucket') {
    repositoryUrl = `https://bitbucket.org/${username}/${repositoryName}.git`;
    auth = {
      username: 'HammadAhmad221',
      password: 'ATBBaz9RJ2LKXGFphTTufSUk3DbV73545F35',
    };
  } else {
    return res.status(400).send('Invalid platform');
  }

  try {
    const repoDir = path.join(__dirname, repositoryName);
    await promisify(fs.mkdir)(repoDir);

    const files = await listFiles.clone({
      dir: repoDir,
      url: repositoryUrl,
      http,
      fs,
      onAuth: () => auth,
    });

    res.send(files);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});