function createMenuLink(item) {
  const link = document.createElement("a");
  link.href = item.href;
  link.textContent = item.label;
  if (item.external) {
    link.target = "_blank";
    link.rel = "noreferrer";
  }
  return link;
}

function createTextListItem(text) {
  const li = document.createElement("li");
  li.textContent = text;
  return li;
}

function createExperienceOrEducationItem(item, primaryKey, secondaryKey) {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${item[primaryKey]}</strong>, ${item[secondaryKey]}, ${item.meta}.`;
  return li;
}

function createPublicationItem(item) {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${item.authors}</strong>. "${item.title}." ${item.venue}. ${item.note}.`;
  return li;
}

function render() {
  const { profile, contact, links, education, experience, researchInterests, publications, service } = siteContent;

  document.getElementById("name").textContent = profile.name;
  document.getElementById("position-line").textContent = profile.position;
  document.getElementById("affiliation-line").textContent = profile.affiliation;
  document.getElementById("address-line").textContent = profile.address;
  document.getElementById("profile-photo").src = profile.photo;
  document.getElementById("last-updated").textContent = profile.lastUpdated;

  const menuRoot = document.getElementById("menu-list");
  links.forEach((item) => {
    menuRoot.appendChild(createMenuLink(item));
  });

  const contactRoot = document.getElementById("contact-inline");
  contact.forEach((item) => {
    const p = document.createElement("p");
    if (item.href) {
      p.innerHTML = `<span class="contact-label">${item.label}:</span> <a href="${item.href}">${item.value}</a>`;
    } else {
      p.innerHTML = `<span class="contact-label">${item.label}:</span> ${item.value}`;
    }
    contactRoot.appendChild(p);
  });

  const aboutRoot = document.getElementById("about-paragraphs");
  profile.about.forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    aboutRoot.appendChild(p);
  });

  const newsRoot = document.getElementById("news-list");
  profile.news.forEach((item) => {
    newsRoot.appendChild(createTextListItem(item));
  });

  const researchRoot = document.getElementById("research-list");
  researchInterests.forEach((item) => {
    researchRoot.appendChild(createTextListItem(item));
  });

  const firstAuthorRoot = document.getElementById("first-author-list");
  publications.firstAuthor.forEach((item) => {
    firstAuthorRoot.appendChild(createPublicationItem(item));
  });

  const coauthorRoot = document.getElementById("coauthor-list");
  publications.coauthor.forEach((item) => {
    coauthorRoot.appendChild(createPublicationItem(item));
  });

  const serviceRoot = document.getElementById("service-list");
  service.forEach((item) => {
    serviceRoot.appendChild(createTextListItem(item));
  });

  const experienceRoot = document.getElementById("experience-list");
  experience.forEach((item) => {
    experienceRoot.appendChild(createExperienceOrEducationItem(item, "title", "organization"));
  });

  const educationRoot = document.getElementById("education-list");
  education.forEach((item) => {
    educationRoot.appendChild(createExperienceOrEducationItem(item, "degree", "school"));
  });
}

render();
