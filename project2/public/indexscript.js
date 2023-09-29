// new project addition
addProjectButton = document.getElementById('addProjectButton');
    const projectNameInput = document.getElementById('projectNameInput');
    const projectDescriptionInput = document.getElementById('projectDescriptionInput');

    function createProject() {
      const projectName = projectNameInput.value.trim();
      if (projectName === '') {
        alert('Project name is required.');
        return;
      }

      const projectDescription = projectDescriptionInput.value.trim();

      const projectData = { name: projectName, description: projectDescription };
      fetch('/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      })
        .then((response) => {
          if (response.ok) {
            console.log("ok");
            projectNameInput.value = '';
            projectDescriptionInput.value = '';
            window.location.reload();
          } else {
        
            console.error('Error creating project:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error creating project:', error);
        });
    }

    addProjectButton.addEventListener('click', createProject);

   
    projectNameInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); 
        createProject(); 
      }
    });

    projectDescriptionInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); 
        createProject(); 
      }
    });

    async function deleteProject(projectId) {
      const confirmed = confirm('Are you sure you want to delete this project?');
      if (!confirmed) {
        return;
      }

      try {
        const response = await fetch(`/projects/${projectId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // If the response is successful, reload the page to see the updated projects
          window.location.reload();
        } else {
          // Handle errors if the server response is not successful
          console.error('Error deleting project:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }

    function toggleEditForm(projectId) {
      const editForm = document.getElementById('editForm' + projectId);
      if (editForm) {
        editForm.style.display = editForm.style.display === 'none' ? 'block' : 'none';
      }
    }

    function toggleAddForm() {
      const addForm = document.getElementById('addForm');
      if (addForm) {
        addForm.style.display = addForm.style.display === 'none' ? 'block' : 'none';
      }
    }

    async function updateProject(projectId) {
      const updatedName = document.getElementById('updateNameInput_' + projectId).value.trim();
      const updatedDescription = document.getElementById('updateDescriptionInput_' + projectId).value.trim();
      console.log(updatedName, updatedDescription);
      if (updatedName !== '') {
        // Send a PUT request to update the project
        try {

          const response = await fetch(`/projects/${projectId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: updatedName, description: updatedDescription }),
          });

          if (response.ok) {
            // If the response is successful, reload the page to display the updated project information
            window.location.reload();
          } else {
            console.error('Failed to update project:', response.status);
          }

        } catch (error) {
          console.error('Error updating project', error);
        }
      }
    }

